"use strict";

const path = require('path');

const home = (req, res) => {
    res.sendFile(path.join(__dirname,'../../frontend/src/html/main.html'));
};

const login = (req, res) => {
    res.sendFile(path.join(__dirname,'../../frontend/src/html/login.html'));
};

const signup = (req, res) => {
    res.sendFile(path.join(__dirname,'../../frontend/src/html/signup.html'));
};

const generate = (req, res) => {
    res.sendFile(path.join(__dirname,'../../frontend/src/html/generate.html'));
};

// 컨트롤러 모듈 내보내기
module.exports = {
    home,
    login,
    signup,
    generate,
};
