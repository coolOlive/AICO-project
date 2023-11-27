function closePopup() {
  let popup = document.getElementById("popup");
  popup.style.display = "none";
}

function showPopup(imgsrc, user, content) {
  let popup = document.getElementById("popup");
  let clickedImg = document.getElementById("post_img");
  let popupUser = document.getElementById("post_popup_userid");
  alert(user);
  alert(content);

  popupUser.innerHTML = user;

  clickedImg.src = imgsrc;
  popup.style.display = "block";
}
