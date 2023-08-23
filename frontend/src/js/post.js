// function showPopup() {
//   let bigPic = document.querySelector('.post_img');
//   let smallPics = document.querySelectorAll('.card-img-top');

//   for(let i = 0; i < smallPics.length; i++) {
//     smallPics[i].onclick = changepic;
      
//   }

//   function changepic() {
//     let smallPicsAttribute = this.getAttribute('src');
//     bigPic.setAttribute('src', smallPicsAttribute);
      
//   }

//   var popupW = 800;
//   var popupH = 650;
//   var left = Math.ceil((window.screen.width - popupW)/2);
//   var top = Math.ceil((window.screen.height - popupH)/2);

//   window.open('post','','width='+popupW+',height='+popupH+',left='+left+',top='+top+',scrollbars=yes,resizable=no,toolbar=no,titlebar=no,menubar=no,location=no');
// }

function closePopup() {
  let popup = document.getElementById('popup');
  popup.style.display = 'none';
}

function showPopup() {
  let popup = document.getElementById('popup');
  
  popup.style.display = 'block';
}