const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { Post, User } = require('../models');

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

module.exports = router;
