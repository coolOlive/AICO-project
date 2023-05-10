const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.followerCount = 0;
  res.locals.followingCount = 0;
  res.locals.followingIdList = [];
  next();
});

router.get('/', (req, res) => { //메인(기본) 페이지
    res.render('main');
});

router.get('/signup',  isNotLoggedIn, (req, res) => { //회원가입 페이지
    res.render('signup', { title: '회원가입 - NodeBird' });
});

router.get('/login',  (req, res, next) => { //로그인 페이지
    const twits = [];
    res.render('login', { 
        title: 'NodeBird',
        twits,
     });
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
