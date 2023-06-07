const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { Post, User, Hashtag } = require('../models');
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

// router.get('/profile', isLoggedIn, (req, res) => { //페이지 - 프로필 profile
//   res.render('profile', { title: '내 정보' , user: req.user});
// });

router.get('/signup',  isNotLoggedIn, (req, res) => { //회원가입 페이지
    res.render('signup', { title: '회원가입' });
});

router.get('/login',  (req, res, next) => { //로그인 페이지
    res.render('login');
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

router.get('/share', async (req, res, next) => { //페이지 - 로그인
  try {
      const posts = await Post.findAll({
          include:{ //작성자 가져옴
              model: User,
              attributes: ['id', 'nick'],
          }, //{ //좋아요 누른 사람 가져옴
          //     model: User,
          //     attributes: ['id', 'nick'],
          //     as: 'Liker', //as로 구분함
          // },
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



router.get('/mypage', isLoggedIn,(req, res) => { //마이페이지
    res.render('mypage');
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