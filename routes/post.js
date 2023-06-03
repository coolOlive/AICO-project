const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { Post, Hashtag } = require('../models');
const { isLoggedIn } = require('./middlewares');
const User = require('../models/user');

const router = express.Router();

try {
  fs.readdirSync('uploads');
} catch (error) {
  console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
  fs.mkdirSync('uploads');
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'uploads/');
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

// POST /post/img
router.post('/img', isLoggedIn, upload.single('img'), (req, res) => {
    console.log(req.file);
    res.json({url: `/img/${req.file.filename}`});
});

// POST /post
const upload2 = multer();
router.post('/', isLoggedIn, upload2.none(), async (req, res, next) => {
    try {
        const post = await Post.create({
            content: req.body.content,
            img:req.body.url,
            UserId: req.user.id,
        });
        const hashtags = req.body.content.match(/#[^\s#]+/g);
        if (hashtags) {
            const result = await Promise.all(
                hashtags.map(tag => {
                    return Hashtag.findOrCreate({
                        where: { title:tag.slice(1).toLowerCase() },
                    })
                }),
            );
            await post.addHashtags(result.map(r => r[0]));
        }
        res.redirect('/');
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.post('/:id/like', async (req, res, next) => {
  try {
    const post = await Post.find({ where: { id: req.params.id }});
    await post.addLiker(req.user.id); //사용자가 이 게시글을 좋아합니다.
    //res.redirect('/');
    res.send('OK');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete('/:id/like', async (req, res, next) => {
  try {
    const post = await Post.find({ where: { id: req.params.id }});
    await post.removeLiker(req.user.id);
    //res.redirect('/');
    res.send('OK');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await Post.destroy({ where: { id: req.params.id, userId: req.user.id}});
    res.send('OK');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;