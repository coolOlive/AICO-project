"use strict";
// 회원가입 동작하는 js 파일

// 유효성 검사
function checkPW() {
    var id = $('#id').val();
    var email = $("#email").val();
    var pw = $("#pasward").val();
    var cpw = $("#pasward_a").val();

    if (id.length<4 || id.length >=20) alert("id가 양식에 적합하지 않습니다.");
    else if (pw.length<4 || cpw.length<4) alert("비밀번호는 4자 이상 입력해주세요");
    else if (pw!=cpw) alert("비밀번호가 일치하지 않습니다.");
    else{
         // $ajax로 데이터 넘겨받은 후 
    }
}