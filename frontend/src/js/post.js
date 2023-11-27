function closePopup() {
  let popup = document.getElementById("popup");
  popup.style.display = "none";
}

function showPopup(imgsrc) {
  let popup = document.getElementById("popup");
  let clicked_img = document.getElementById("post_img");

  clicked_img.src = imgsrc;
  popup.style.display = "block";
}
