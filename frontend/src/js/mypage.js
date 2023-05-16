window.onload=()=>{
  document.querySelector('.menu-trigger').onclick = ()=>{
    var burger = $('.menu-trigger');
    var category_btn = $('.category_group');
    // var category_btn = document.getElementsByClassName('category_group');

    burger.each(function(index) {
      $(this).toggleClass('active-8');
      if (category_btn.css('display') == 'none') {
        category_btn.css("display","flex");
        // category_btn.css("visibility","visible");
        // category_btn.css("width","visible");
      } else {
        category_btn.css("display","none");
      }
    });

  }
}
