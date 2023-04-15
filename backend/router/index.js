"use strict";

const express = require("express");
const router = express.Router();
const path = require("./path");

//일단 기본 화면을 main이 아니라 로그인 화면으로 해놨어요.
router.get("/",path.login);

router.get("/login",path.login);

router.get("/signup",path.signup);

router.get("/generate",path.generate);

module.exports = router;
