var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent =
  SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

var animal = [
  "돼지",
  "개",
  "고양이",
  "쥐",
  "염소",
  "양",
  "말",
  "호랑이",
  "사자",
  "사슴",
  "코끼리",
  "악어",
  "기린",
  "코뿔소",
  "원숭이",
  "나무늘보",
  "고슴도치",
  "얼룩말",
  "젖소",
  "오리",
];
var grammar =
  "#JSGF V1.0; grammar animal; public <animal> = " + animal.join(" | ") + " ;";

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = "ko-KR";
// recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

var diagnostic = document.querySelector(".output");
var bg = document.querySelector("html");
var hints = document.querySelector(".hints");
var result = document.querySelector(".result");
var right = document.querySelector(".right");
var wrong = document.querySelector(".wrong");

let state = "ready";
let count = 0;
let rightNum = 0;
let wrongNum = 0;

var wordHTML = "";
function start() {
  setTimeout(function () {
    recognition.start();
    currentWord = "시작";
    wordHTML = currentWord;
    hints.innerHTML = wordHTML;
    diagnostic.textContent = "";
    console.log("시작! 하고 말하면 시작한다.");

    count = 0;
    rightNum = 0;
    right.innerHTML = rightNum;
    wrongNum = 0;
    wrong.innerHTML = wrongNum;
  }, 1000);
}

recognition.onresult = function (event) {
  // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
  // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
  // It has a getter so it can be accessed like an array
  // The first [0] returns the SpeechRecognitionResult at the last position.
  // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
  // These also have getters so they can be accessed like arrays.
  // The second [0] returns the SpeechRecognitionAlternative at position 0.
  // We then return the transcript property of the SpeechRecognitionAlternative object
  var spokenWord = event.results[0][0].transcript;

  if (state === "ready") {
    if (spokenWord == currentWord) {
      console.log("시작합니다");

      state = "start";
      count = 0;
      rightNum = 0;
      right.innerHTML = rightNum;
      wrongNum = 0;
      wrong.innerHTML = wrongNum;
      return;
    } else {
      console.log("시작하고 제대로 말해요!");
      diagnostic.textContent = spokenWord;
      start();
      return;
    }
  }
  diagnostic.textContent = spokenWord;
  if (spokenWord === currentWord) {
    result.innerHTML = "정답입니다";
    document.body.style.backgroundColor = "green";
    rightNum++;
    right.innerHTML = rightNum;
  } else {
    result.innerHTML = "오답입니다";
    document.body.style.backgroundColor = "red";
    wrongNum++;
    wrong.innerHTML = wrongNum;
  }
  count++;

  console.log("Confidence: " + event.results[0][0].confidence);
};

recognition.onend = function () {
  if (count === 10) {
    console.log("10문제 완료");
    setTimeout(function () {
      start();
    }, 3000);
    return;
  }
  setTimeout(function () {
    restart();
  }, 3000);
};

function restart() {
  document.body.style.backgroundColor = "#212529";
  recognition.start();
  currentWord = animal[Math.floor(Math.random() * animal.length)];
  wordHTML = currentWord;
  hints.innerHTML = wordHTML;
  console.log("Ready to receive a word.");
}

recognition.onspeechend = function () {
  recognition.stop();
};

recognition.onnomatch = function (event) {
  diagnostic.textContent = "못 알아 들었어요";
};

recognition.onerror = function (event) {
  diagnostic.textContent = "못 알아 들었어요: " + event.error;
};
