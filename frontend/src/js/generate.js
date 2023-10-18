var whitelist = ['Gogh',"A# .NET", "A# (Axiom)", "A-0 System", "A+", "A++", "ABAP", "ABC", "ABC ALGOL", "ABSET", "ABSYS", "ACC", "Accent", "Ace DASL", "ACL2", "Avicsoft", "ACT-III", "Action!", "ActionScript", "Ada", "Adenine", "Agda", "Agilent VEE", "Agora", "AIMMS", "Alef", "ALF", "ALGOL 58", "ALGOL 60", "ALGOL 68", "ALGOL W", "Alice", "Alma-0", "AmbientTalk", "Amiga E", "AMOS", "AMPL", "Apex (Salesforce.com)", "APL", "AppleScript", "Arc", "ARexx", "Argus", "AspectJ", "Assembly language", "ATS", "Ateji PX", "AutoHotkey", "Autocoder", "AutoIt", "AutoLISP / Visual LISP", "Averest", "AWK", "Axum", "Active Server Pages", "ASP.NET", "B", "Babbage", "Bash", "BASIC", "bc", "BCPL", "BeanShell", "Batch (Windows/Dos)", "Bertrand", "BETA", "Bigwig", "Bistro", "BitC", "BLISS", "Blockly", "BlooP", "Blue", "Boo", "Boomerang", "Bourne shell (including bash and ksh)", "BREW", "BPEL", "B", "C--", "C++ – ISO/IEC 14882", "C# – ISO/IEC 23270", "C/AL", "Caché ObjectScript", "C Shell", "Caml", "Cayenne", "CDuce", "Cecil", "Cesil", "Céu", "Ceylon", "CFEngine", "CFML", "Cg", "Ch", "Chapel", "Charity", "Charm"];

window.onload=function() {
  // 해시태그 기능
  let input = document.querySelector('input[name="tags"]');
    
  let tagify = new Tagify(input, {
    whitelist:whitelist,
    maxTags: 10,
    dropdown: {
      maxItems: 20,          
      classname: "tags-look", 
      enabled: 0,            
      closeOnSelect: false
    }
  })

  // 파일 표시 기능
  let file = document.querySelector("#img_file");
  let show = document.querySelector("#file_show");
  let deleteBtn = document.querySelector("#file_delete_btn");
  
  
  file.addEventListener('change',function() {
    if(window.FileReader){  // modern browser
      var filename = $(this)[0].files[0].name;
    } 
    else {  // old IE
      var filename = $(this).val().split('/').pop().split('\\').pop();  // 파일명만 추출
    }
    
    // 화면 보이기, 추출한 파일명 삽입
    $(show).css('display', 'block');
    $(deleteBtn).css('display', 'block');
    $(this).siblings(show).val(filename);
  });
};

function textareaSize() {
  let textarea = document.querySelector("#generate_txt");
  let generateTxt = textarea.value;
  
  textarea.style.height = 'auto';
  textarea.style.minHeight = `36px`;
  let height = textarea.scrollHeight; // 높이

  if (height > 300) {
    textarea.style.height = `300px`;
    textarea.style.overflow = `auto`;
  } else if (generateTxt.split('\n').length > 1) {
    textarea.style.height = `${height + 5}px`;
    textarea.style.minHeight = `${height + 5}px`;
  } else {
    textarea.style.height = 'auto';
  }
};

function deleteFile() {
  let show = document.querySelector("#file_show");
  let deleteBtn = document.querySelector("#file_delete_btn");
  show.value = '';
  
  $(show).css('display', 'none');
  $(deleteBtn).css('display', 'none');
};

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
          generatedImage.src = "loadingImage.png";
          
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