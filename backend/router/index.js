"use strict";

const express = require("express");
const router = express.Router();
const path = require("./path");

router.get("/main",path.main);

router.get("/login",path.login);

router.get("/signup",path.signup);

router.get("/generate",path.generate);

module.exports = router;
