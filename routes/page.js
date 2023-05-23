const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { Post, User } = require('../models');
const { Configuration, OpenAIApi } = require("openai");

const router = express.Router();

router.use((req, res, next) => {
    res.locals.user = req.user;
    res.locals.followerCount = req.user?.Followers?.length || 0;
    res.locals.followingCount = req.user?.Followings?.length || 0;
    res.locals.followingIdList = req.user?.Followings?.map(f => f.id) || [];
    next();
  });

// router.get('/', (req, res) => { //메인(기본) 페이지
//     res.render('main');
// });

router.get('/signup',  isNotLoggedIn, (req, res) => { //회원가입 페이지
    res.render('signup', { title: '회원가입' });
});

router.get('/login',  (req, res, next) => { //로그인 페이지
    const twits = [];
    res.render('login', { 
        title: '로그인',
        twits,
     });
});

router.get('/',  async (req, res, next) => { //페이지
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
            title: 'NodeBird',
            twits: posts,
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.get('/hashtag', async (req, res, next) => {
    const query = req.query.hashtag;
    if (!query) {
      return res.redirect('/');
    }
    try {
      const hashtag = await Hashtag.findOne({ where: { title: query } });
      let posts = [];
      if (hashtag) {
        posts = await hashtag.getPosts({ include: [{ model: User }] });
      }
  
      return res.render('main', {
        title: `${query} `,
        twits: posts,
      });
    } catch (error) {
      console.error(error);
      return next(error);
    }
  });
  
router.get('/generate',  isNotLoggedIn, (req, res) => { //생성페이지
    res.render('generate');
});

router.get('/share', (req, res) => { //공유(게시판) 페이지
    res.render('share');
});

router.get('/mypage', (req, res) => { //마이페이지
    res.render('mypage');
});

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const generateImage = async (prompt) => {
  const response = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "512x512",
      response_format: "b64_json",
    });
    const image = response.data.data[0].b64_json;
    //image_url = response.data.data[0].url;
    return image;
};

router.post("/generate", async (req, res) => {
  const image = await generateImage(req.body.prompt);
  console.log(image);
  res.send({ image });
});

module.exports = router;
