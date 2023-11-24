// window.onload = () => {
//   document.querySelector("#imageContainer").onclick = () => {
//     alert("hello");
//   };
// };

// window.onload = () => {
//   document.querySelector(".menu-trigger").onclick = () => {
//     alert("hello");
//     var burger = $(".menu-trigger");
//     var category_btn = $(".category_group");
//     // var category_btn = document.getElementsByClassName('category_group');

//     burger.each(function (index) {
//       $(this).toggleClass("active-8");
//       if (category_btn.css("display") == "none") {
//         category_btn.css("display", "flex");
//       } else {
//         category_btn.css("display", "none");
//       }
//     });
//   };

//   window.onresize = function (event) {
//     alert("hihihi");
//     var innerWidth = window.innerWidth;
//     var burger = $(".menu-trigger");
//     var category_btn = $(".category_group");

//     if (innerWidth < "1032") {
//       burger.each(function (index) {
//         if ($(this).hasClass("active-8")) {
//           $(this).toggleClass("active-8");
//         }
//       });
//       category_btn.css("display", "none");
//     } else {
//       category_btn.css("display", "flex");
//     }
//   };
// };

function hambuger() {
  var burger = $(".menu-trigger");
  var category_btn = $(".category_group");
  burger.each(function (index) {
    $(this).toggleClass("active-8");
    if (category_btn.css("display") == "none") {
      category_btn.css("display", "flex");
    } else {
      category_btn.css("display", "none");
    }
  });
}

// function imgDownload() {
//   let clickedSrc = document.getElementById("clicked_img").src;

//   var img = new Image();
//   img.crossOrigin = "Anonymous";
//   img.id = "getshot";
//   img.src = clickedSrc;
//   document.body.appendChild(img);

//   var a = document.createElement("a");
//   a.href = clickedSrc;
//   a.download = `aico_download`;
//   a.click();
//   document.body.removeChild(img);

//   // alert(clickedSrc);

//   // var img = new Image();
//   // img.crossOrigin = "Anonymous";
//   // img.id = "getshot";
//   // img.src = clickedSrc;
//   // document.body.appendChild(img);
//   // alert(getshot.src);

//   // var arSplitUrl = getshot.src.split("/");
//   // var nArLength = arSplitUrl.length;
//   // var arFileName = arSplitUrl[nArLength - 1];
//   // arFileName = `/${arFileName}`;
//   // var sFileName = decodeURIComponent(arFileName);
//   // sFileName = sFileName.replace(" ", "_");
//   // alert(sFileName);

//   // var a = document.createElement("a");
//   // a.href = sFileName;
//   // a.download = "aico_download";
//   // a.click();
//   // document.body.removeChild(img);

//   // var img = new Image();
//   // img.crossOrigin = "Anonymous";
//   // img.id = "getshot";
//   // img.src = clickedSrc;
//   // document.body.appendChild(img);

//   // var a = document.createElement("a");
//   // var arSplitUrl = getshot.src.split("/");
//   // var nArLength = arSplitUrl.length;
//   // var arFileName = arSplitUrl[nArLength - 1];
//   // var arSplitFileName = arFileName.split(".");
//   // var sFileName = decodeURIComponent(arSplitFileName[0]);
//   // sFileName = sFileName.replace(" ", "_");
//   // // sFileName = sFileName.replace(/image_/g, "");
//   // // alert(sFileName);
//   // // alert(arSplitFileName[1]);
//   // // a.href = getshot.src;
//   // a.href = `image_${sFileName}.${arSplitFileName[1]}`;
//   // alert(a.href);
//   // a.download = `image_${sFileName}.${arSplitFileName[1]}`;
//   // a.click();
//   // document.body.removeChild(img);
// }

// function imgDownload(imageURL, fileName) {
//   alert("ss");
//   var img = new Image();
//   img.crossOrigin = "Anonymous";
//   img.id = "getshot";
//   img.src = imageURL;
//   document.body.appendChild(img);

//   var a = document.createElement("a");
//   a.href = getshot.src;
//   a.download = fileName;
//   a.click();
//   document.body.removeChild(img);
// }
