let numArr = [];
let count = 0;
let inputArea = document.getElementById("input-area");
let resultArea = document.getElementById("result-area");
let playBtn = document.getElementById("play-btn");
let resetBtn = document.getElementById("reset-btn");
let endMessage = document.getElementById("end-message");

playBtn.addEventListener("click", play);
resetBtn.addEventListener("click", reset);

// 랜덤 숫자 생성
function randomNum() {
  numArr = [];
  for (let i = 0; i < 3; i++) {
    let num = Math.floor(Math.random() * 10);
    if (!numArr.includes(num)) {
      numArr.push(num);
    } else {
      i--;
    }
  }
  console.log("정답 : ", numArr); // 랜덤 숫자 확인
}

// Go 버튼 누르면 실행
function play() {
  let inputValue = inputArea.value;

  // 유효성 검사
  if (inputValue === "" || !/^\d{3}$/.test(inputValue)) {
    alert("3자리 숫자를 입력하세요");
    return;
  }

  let inputArr = inputValue.split("").map(Number);
  let [strike, ball] = checkCount(numArr, inputArr); // Strike, Ball 체크
  result(strike, ball);

  count++; // 도전 횟수

  console.log("count : " + count);
  console.log("strike : " + strike);
  console.log("ball : " + ball);

  if (strike === 3) {
    endMessage.innerHTML = `${count}번만에 맞히셨습니다🔥<br>게임을 종료합니다💦`;
    playBtn.disabled = true; // Go 버튼 비활성화
  }

  inputArea.value = "";
}

// Strike, Ball 체크하기
function checkCount(numArr, inputArr) {
  let strike = 0;
  let ball = 0;

  for (let i = 0; i < numArr.length; i++) {
    if (numArr[i] === inputArr[i]) {
      strike++;
    } else if (numArr.includes(inputArr[i])) {
      ball++;
    }
  }

  return [strike, ball];
}

// 결과 보기
function result(strike, ball) {
  resultArea.innerHTML = `${ball}B${strike}S`;
}

// 새로운 게임
function reset() {
  playBtn.disabled = false; // Go 버튼 활성화
  inputArea.value = "";
  randomNum();
  resultArea.textContent = "다시 도전!!";
  count = 0;
}

randomNum();
