const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { Post, User, Hashtag } = require('../models');
const { Configuration, OpenAIApi } = require("openai");
const fs = require("fs");
const AWS = require("aws-sdk");
require('dotenv').config();
const cors = require("cors");

const router = express.Router();

router.use((req, res, next) => {
    res.locals.user = req.user;
    res.locals.followerCount = req.user?.Followers?.length || 0;
    res.locals.followingCount = req.user?.Followings?.length || 0;
    res.locals.followingIdList = req.user?.Followings?.map(f => f.id) || [];
    next();
  });

  router.use(cors());
  router.use(express.json());

// router.get('/', (req, res) => { //메인(기본) 페이지
//     res.render('main');
// });

// router.get('/profile', isLoggedIn, (req, res) => { //페이지 - 프로필 profile
//   res.render('profile', { title: '내 정보' , user: req.user});
// });

router.get('/signup',  isNotLoggedIn, (req, res) => { //회원가입 페이지
    res.render('signup', { title: '회원가입' });
});

router.get('/login', (req, res, next) => {
  if (req.isAuthenticated()) {
    // 이미 로그인한 경우
    res.redirect('/mypage');
  } else {
    // 로그인하지 않은 경우
    res.render('login');
  }
});

// router.get('/login', isNotLoggedIn, (req, res, next) => { //로그인 페이지 로그인 안했을 때
//   res.render('login');
// });
// router.get('/login', isLoggedIn, (req, res, next) => { //로그인 페이지 로그인 앴을 때
//    res.redirect('/mypage');
//  });

router.get('/', async (req, res, next) => { //페이지
    try {
        const posts = await Post.findAll({
            include:{
                model: User,
                attributes: ['id', 'nick'],
            },
            other: [['createdAt', 'DESC']],
        });
        // const twits = [];
        res.render('main', { 
            title: 'main',
            twits: posts,
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

  
router.get('/generate', (req, res) => { //생성페이지
    res.render('generate');
});

router.get('/share', isLoggedIn, async (req, res, next) => { //페이지 - 로그인
  try {
      const posts = await Post.findAll({
          include:[{ //작성자 가져옴
              model: User,
              attributes: ['id', 'nick'],
          }, { //좋아요 누른 사람 가져옴
            model: User,
            attributes: ['id', 'nick'],
            as: 'Liker', //as로 구분함
        }],
          other: [['createdAt', 'DESC']],
      });
      // const twits = [];
      res.render('share2', { 
          twits: posts,
          user:req.user,
      });
  } catch (err) {
      console.error(err);
      next(err);
  }
});


router.get('/hashtag', async (req, res, next) => {
  const query = req.query.hashtag;
  if (!query) {
    return res.redirect('/share');
  }
  try {
    const hashtag = await Hashtag.findOne({ where: { title: query } });
    let posts = [];
    if (hashtag) {
      posts = await hashtag.getPosts({ include: [{ model: User }] });
    }

    return res.render('share2', {
      title: `${query}`,
      twits: posts,
      user:req.user,
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});



router.get('/mypage', isLoggedIn, async (req, res) => { //페이지 - 로그인
  try {
      const posts = await Post.findAll({
          include:[{ //작성자 가져옴
              model: User,
              attributes: ['id', 'nick'],
          }, { //좋아요 누른 사람 가져옴
              model: User,
              attributes: ['id', 'nick'],
              as: 'Liker', //as로 구분함
          }],
          other: [['createdAt', 'DESC']],
      });
      // const twits = [];
      res.render('mypage', { 
          twits: posts,
          user:req.user,
      });
  } catch (err) {
      console.error(err);
      next(err);
  }
});



router.get('/post', (req, res) => { //댓글 및 게시글 입력 화면
  res.render('post');
});

router.get('/imgclick', (req, res) => { //이미지 클릭 화면
  res.render('img_click');
});

router.get('/write', (req, res) => { //글쓰기 페이지
  res.render('write');
});

router.get('/history', (req, res) => { //history 페이지
  res.render('history');
});

router.get('/likes', (req, res) => { //likes 페이지
  res.render('likes');
});

router.get('/mypost', (req, res) => { //mypost 페이지
  res.render('mypost');
});

router.get('/comment', (req, res) => { //comment 페이지
  res.render('comment');
});

router.get('/account', (req, res) => { //account 페이지
  res.render('account');
});

router.get('/about', (req, res) => { //about 페이지
  res.render('about');
});

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const generateImage = async (combinedPrompt) => {
  const response = await openai.createImage({
      prompt: combinedPrompt,
      n: 1,
      size: "512x512",
      response_format: "b64_json",
    });
    //console.log(response);
    console.log("combinedPrompt: ", combinedPrompt);
    //console.log("response data: ", response.data);

    const imageUrl = response.data.data[0].b64_json;

    const params = {
      Bucket: "aico-content",
      Key: "generated-image.png",
      Body: Buffer.from(imageUrl, "base64"),
      ContentEncoding: "base64",
      ContentType:"image/png",
    };

    await s3.upload(params).promise();

    return imageUrl;
};

router.post("/generate", async (req, res) => {
  try {
    const { prompt } = req.body;
    console.log("router prompt: ",prompt);
    const image = await generateImage(prompt);
    //console.log("image: ",image);
    //const imageUrl = await uploadToImgur(image);
    const s3ObjectUrl = "https://aico-content.s3.amazonaws.com/generated-image.png";

    res.send({ image, s3ObjectUrl });
  } catch (error) {
    console.error('Image generation failed:', error);
    console.error("response data error: ", error.response.data);
    console.error("response status error: ", error.response.status);
    res.status(500).json({ error: 'Image generation failed' });
  }
});

module.exports = router;