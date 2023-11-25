// window.onload = () => {
//   document.querySelector(".dropbtn").onclick = () => {
//     dropdown();
//   };
//   document.getElementsByClassName("sort_by").onclick = () => {
//     showMenu(value);
//   };

//   // document.querySelector('.heart').onclick = ()=>{
//   //   changeHeart();
//   // }

//   dropdown = () => {
//     var v = document.querySelector(".dropdown-content");
//     var dropbtn = document.querySelector(".dropbtn");
//     v.classList.toggle("show");
//     dropbtn.style.borderColor = "rgb(94, 94, 94)";
//   };

//   showMenu = (value) => {
//     var dropbtn_content = document.querySelector(".dropbtn_content");
//     var dropbtn_click = document.querySelector(".dropbtn_click");
//     var dropbtn = document.querySelector(".dropbtn");

//     dropbtn_content.innerText = value;
//   };
// };

window.onclick = (e) => {
  if (!e.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");

    var dropbtn_content = document.querySelector(".dropbtn_content");
    var dropbtn_click = document.querySelector(".dropbtn_click");
    var dropbtn = document.querySelector(".dropbtn");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

function changeHeart(tag) {
  const twitId = tag.id;

  axios
    .post(`/post/${twitId}/like`)
    .then((res) => {
      if (res.data === "Liked") {
        tag.src = "http://localhost:8003/like_btn.svg";
      } else if (res.data === "Unliked") {
        tag.src = "http://localhost:8003/white_heart.svg";
      }
    })
    .catch((err) => {
      console.error(err);
    });
}

document.querySelectorAll(".like").forEach(function (tag) {
  tag.addEventListener("click", function () {
    changeHeart(tag);
  });
});

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
