window.onload = function () {
  // 해시태그 기능
  let input = document.querySelector('input[name="tags"]');
  let tagify = new Tagify(input, {
    whitelist: STYLE_TAG,
    maxTags: 10,
    dropdown: {
      maxItems: 20,
      classname: "tags-look",
      enabled: 0,
      closeOnSelect: false,
    },
  });

  // 파일 표시 기능
  let file = document.querySelector("#img_file");
  let show = document.querySelector("#file_show");
  let deleteBtn = document.querySelector("#file_delete_btn");

  file.addEventListener("change", function () {
    if (window.FileReader) {
      // modern browser
      var filename = $(this)[0].files[0].name;
    } else {
      // old IE
      var filename = $(this).val().split("/").pop().split("\\").pop(); // 파일명만 추출
    }

    // 화면 보이기, 추출한 파일명 삽입
    $(show).css("display", "block");
    $(deleteBtn).css("display", "block");
    $(this).siblings(show).val(filename);
  });
};

function textareaSize() {
  let textarea = document.querySelector("#generate_txt");
  let generateTxt = textarea.value;

  textarea.style.height = "auto";
  textarea.style.minHeight = `36px`;
  let height = textarea.scrollHeight; // 높이

  if (height > 300) {
    textarea.style.height = `300px`;
    textarea.style.overflow = `auto`;
  } else if (generateTxt.split("\n").length > 1) {
    textarea.style.height = `${height + 5}px`;
    textarea.style.minHeight = `${height + 5}px`;
  } else {
    textarea.style.height = "auto";
  }
}

function deleteFile() {
  let show = document.querySelector("#file_show");
  let deleteBtn = document.querySelector("#file_delete_btn");
  show.value = "";

  $(show).css("display", "none");
  $(deleteBtn).css("display", "none");
}

/*
function checkGenerate() {
  let show = document.querySelector("#file_show").value;
  let txt = document.querySelector("#generate_txt").value;
  let style = document.querySelector("#tag").value;

  if (show === '' && txt === ''&& style === '') {
    alert(`요구사항을 입력하세요`);
    return false;
  }

  return true;
}
*/

const promptInput = document.querySelector("#generate_txt");
const generatedImage = document.querySelector("#picture");
const tagInput = document.querySelector("#tag");

const generateImage = async (event) => {
  event.preventDefault();

  const prompt = promptInput.value;
  const tag = tagInput.value;
  console.log(tag);
  const combinedPrompt = prompt + tag;

  if (combinedPrompt) {
    try {
      //generatedImage.src = "loadingImage.png";

      const response = await fetch("http://localhost:8003/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: combinedPrompt }),
      });

      const data = await response.json();
      const image = `data:image/jpeg;base64,${data.image}`;
      generatedImage.src = image;
    } catch (error) {
      console.log(error);
      showNotification(generatedImage.src);
      generatedImage.src = "testImage.png";
    }
  } else {
    showNotification("요구사항을 입력하세요.");
  }
};

const generateBtn = document.querySelector(".generate_btn");
generateBtn.addEventListener("click", generateImage);

const forms = document.getElementsByClassName(".generate_form");
for (let i = 0; i < forms.length; i++) {
  forms[i].addEventListener("submit", generateImage);
}

const STYLE_TAG = [
  // artist
  "고흐",
  "다빈치",
  "뭉크",
  "피카소",
  "미켈란젤로",
  "벨라스케스",
  "보티첼리",
  "클림트",
  "달리",
  "마네",
  "앤디 워홀",
  "후안 미로",
  "에게르",
  "요하네스",

  // westTime: [
  "중세",
  "르네상스",
  "매너리즘",
  "바로크",
  "로코코",
  "낭만주의",
  "신고전주의",
  "사실주의",
  "아르누보",
  "인상주의",
  "후기 인상파",
  "야수파",
  "표현주의",
  "큐비즘",
  "미래파",
  "입체주의",
  "초현실주의",
  "추상표현주의",
  "추상주의",
  "신조형주의",
  "다다이즘",
  "모노크롬",
  "앵포르멜",
  "누보레알리즘",
  "옵아트",
  "팝아트",
  "아르테 포베라",
  "미니멀리즘",
  "개념 미술",
  "현대 미술",
  "키네틱 아트",

  // plus
  "픽셀아트",
  "야간 풍경",
  "미래 도시",
  "사이버펑크",
  "스팀펑크",
  "감성적인",
  "낭만적인",
  "미스테리",
  "따뜻한",
  "차가운",
  "스릴러",
  "퓨처리스틱",
  "서부",
  "레트로",
  "환상적인",
  "매혹적인",
  "신비로운",
  "사실적인",
  "공포",
  "디지털 아트",
  "3D",
  "유화",
  "판화",
  "동양적인",
  "실루엣",
  "네온사인",
  "네온 조명",
  "스케치",
  "오일파스텔",
  "디지털아트",
  "만화적",
  "도시의",
  "빨간색",
  "노랑색",
  "초록색",
  "파란색",
  "보라색",
  "검정색",
  "희색",
  "회색",
  "자연적인",
  "인공적인",
  "한국 스타일",
  "일본 스타일",
];
