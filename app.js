const express = require('express');
const index = require("./backend/router/index");
const app = express();
const port = 3000;

//css 파일 연동, 이미지 자료 사용 경로 _ 이건 수정하지 말아주세요.
app.use(express.static('frontend/src'));
app.use(express.static('frontend/assets/images'));
app.use(express.static('frontend/assets/icon'));

// 경로 설정을 위해(/login, /main..)
app.use("/",index);

app.listen(port, () => {
  console.log(`서버 실행중.`);
});

module.exports = app;
