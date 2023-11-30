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

  if (gTxt.length > 1) {
    var gTagFirst = gTxt[1].split(`{"value":`).join("");
    var tags = gTagFirst.replace(/}/g, "");
    tags = tags.replace(/]/g, "");
    tags = tags.replace(/"/g, "");
    var printTags = tags.split(`,`);

    imgTxt.innerHTML = `${gTxt[0]}<br>#${printTags.join(` #`)}`;
  } else {
    imgTxt.innerHTML = `${gTxt[0]}`;
  }
  clickImg.src = imgsrc;

  popup.style.display = "block";

  // 화면 스크롤을 맨 위로 이동
  $("html, body").animate({ scrollTop: 0 }, 400);
}

function copyTxt() {
  let text = document.getElementById("img_generating_txt").textContent;

  const textArea = document.createElement("textarea");
  document.body.appendChild(textArea);
  textArea.value = text;
  textArea.select();
  document.execCommand("copy");
  document.body.removeChild(textArea);
  alert(`복사되었습니다.`);
}

function changeHeart(num) {
  let heart = document.getElementById(num).src;

  if (heart == "http://localhost:8003/white_heart.svg") {
    document.getElementById(num).src = "http://localhost:8003/like_btn.svg";
  } else {
    document.getElementById(num).src = "http://localhost:8003/white_heart.svg";
  }
}

async function toDataURL(url) {
  const blob = await fetch(url).then((res) => res.blob());
  return URL.createObjectURL(blob);
}
