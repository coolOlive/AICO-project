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
