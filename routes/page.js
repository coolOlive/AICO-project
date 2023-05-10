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

router.get('/profile', isLoggedIn, (req, res) => { //페이지 - 프로필 profile
    res.render('profile', { title: '내 정보 - NodeBird' });
});

router.get('/signup',  isNotLoggedIn, (req, res) => { //페이지 - 회원가입 join
    res.render('signup', { title: '회원가입 - NodeBird' });
});

router.get('/generate',  isNotLoggedIn, (req, res) => { //페이지 - 회원가입 join
    res.render('generate');
});

router.get('/login',  (req, res, next) => { //페이지 - 로그인
    const twits = [];
    res.render('login', { 
        title: 'NodeBird',
        twits,
     });
});

router.get('/', (req, res) => { //페이지 - 메인 main
    res.render('main');
});

module.exports = router;