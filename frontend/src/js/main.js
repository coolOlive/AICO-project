function closePopup() {
  let popup = document.getElementById('popup_bg');
  popup.style.display = 'none';
}

function showPopup() {
  let popup = document.getElementById('popup_bg');
  
  popup.style.display = 'block';
}

function changeHeart(num) {
  let heart = document.getElementById(num).src;

  if (heart == "http://localhost:8003/white_heart.svg") {
    document.getElementById(num).src = "http://localhost:8003/like_btn.svg";
  } else {
    document.getElementById(num).src = "http://localhost:8003/white_heart.svg";
  }
}

function imgDownload(imageURL, fileName) {
  var img = new Image();
      img.crossOrigin = "Anonymous";
        img.id = "getshot";
        img.src = imageURL;
        document.body.appendChild(img);
        
    var a = document.createElement("a");
        a.href = getshot.src;
        a.download = fileName;
        a.click();
        document.body.removeChild(img);
}