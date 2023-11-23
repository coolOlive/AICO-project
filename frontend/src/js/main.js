function closePopup() {
  let popup = document.getElementById("popup_bg");
  popup.style.display = "none";
}

function showPopup(imgsrc) {
  let popup = document.getElementById("popup_bg");
  let clickImg = document.getElementById("clicked_img");
  let imgTxt = document.getElementById("img_generating_txt");

  var arSplitUrl = imgsrc.split("/");
  var nArLength = arSplitUrl.length;
  var arFileName = arSplitUrl[nArLength - 1];
  var arSplitFileName = arFileName.split(".");
  var sFileName = decodeURIComponent(arSplitFileName[0]);

  var gTotalTxt = sFileName.split("_");
  var gTxt = gTotalTxt[1].split("[");

  var gTagFirst = gTxt[1].split(`{"value":`).join("");
  var tags = gTagFirst.replace(/}/g, "");
  tags = tags.replace(/]/g, "");
  tags = tags.replace(/"/g, "");
  var printTags = tags.split(`,`);

  imgTxt.innerHTML = `${gTxt[0]}<br>#${printTags.join(` #`)}`;
  clickImg.src = imgsrc;

  popup.style.display = "block";
}

function changeHeart(num) {
  let heart = document.getElementById(num).src;

  if (heart == "http://localhost:8003/white_heart.svg") {
    document.getElementById(num).src = "http://localhost:8003/like_btn.svg";
  } else {
    document.getElementById(num).src = "http://localhost:8003/white_heart.svg";
  }
}

// function nextImg() {
//   let nextSrc = document.getElementById(`history_${num + 1}`).src;
//   let clickImg = document.getElementById("clicked_img");
//   clickImg.src = nextSrc;
// }
async function toDataURL(url) {
  const blob = await fetch(url).then((res) => res.blob());
  return URL.createObjectURL(blob);
}

function imgDownload() {
  let clickedSrc = document.getElementById("clicked_img").src;
  var img = new Image();
  img.crossOrigin = "Anonymous";
  img.id = "getshot";
  img.src = clickedSrc;
  document.body.appendChild(img);

  var a = document.createElement("a");
  var arSplitUrl = getshot.src.split("/");
  var nArLength = arSplitUrl.length;
  var arFileName = arSplitUrl[nArLength - 1];
  var arSplitFileName = arFileName.split(".");
  var sFileName = decodeURIComponent(arSplitFileName[0]);
  alert(sFileName);
  alert(arSplitFileName[1]);
  // a.href = getshot.src;
  a.href = `/${sFileName}.${arSplitFileName[1]}`;
  alert(a.href);
  a.download = `${sFileName}.${arSplitFileName[1]}`;
  a.click();
  document.body.removeChild(img);

  // var img = new Image();
  // img.crossOrigin = "Anonymous";
  // img.id = "getshot";
  // img.src = clickedSrc;
  // document.body.appendChild(img);

  // var a = document.createElement("a");
  // var arSplitUrl = getshot.src.split("/");
  // var nArLength = arSplitUrl.length;
  // var arFileName = arSplitUrl[nArLength - 1];
  // alert(arFileName);
  // var arSplitFileName = arFileName.split(".");
  // var sFileName = arSplitFileName[0];
  // a.href = `/${sFileName}.${arSplitFileName[1]}`;
  // a.download = `${sFileName}.${arSplitFileName[1]}`;
  // alert(a.href);
  // a.click();
  // document.body.removeChild(img);
}

// var arSplitUrl   = sOriginImgUrl.split("/");    //   "/" 로 전체 url 을 나눈다
//
// var nArLength     = arSplitUrl.length;
//
// var arFileName         = arSplitUrl[nArLength-1];   // 나누어진 배열의 맨 끝이 파일명이다
//
//

// var num = clickedSrc.lastIndexOf("/");
// var file_name = decodeURIComponent(clickedSrc.substr(num + 1));
// alert(num);
// alert(file_name);
// const a = document.createElement("a");
// a.href = toDataURL(decodeURIComponent(clickedSrc));
// a.download = file_name;
// document.body.appendChild(a);
// a.click();
// document.body.removeChild(a);

//
// var arSplitFileName     = sImgUrl.split(".");   // 파일명을 다시 "." 로 나누면 파일이름과 확장자로 나뉜다
//
//
//
// var sFileName = arSplitFileName[0];         // 파일이름
//
// var sFileExtension = arSplitFileName[1]
