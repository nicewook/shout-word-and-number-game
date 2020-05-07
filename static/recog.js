var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent =
  SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

// var colors = [ 'aqua' , 'azure' , 'beige', 'bisque', 'black', 'blue', 'brown', 'chocolate', 'coral', 'crimson', 'cyan', 'fuchsia', 'ghostwhite', 'gold', 'goldenrod', 'gray', 'green', 'indigo', 'ivory', 'khaki', 'lavender', 'lime', 'linen', 'magenta', 'maroon', 'moccasin', 'navy', 'olive', 'orange', 'orchid', 'peru', 'pink', 'plum', 'purple', 'red', 'salmon', 'sienna', 'silver', 'snow', 'tan', 'teal', 'thistle', 'tomato', 'turquoise', 'violet', 'white', 'yellow'];
var colors = [
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
];
var grammar =
  "#JSGF V1.0; grammar colors; public <color> = " + colors.join(" | ") + " ;";

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

var currentColor = "사슴";
var colorHTML = "";
// colors.forEach(function (v, i, a) {
//   console.log(v, i);
//   colorHTML += '<span style="background-color:' + v + ';"> ' + v + " </span>";
// });
// hints.innerHTML = "단어들: " + colorHTML;

// document.body.onclick = function () {
//   recognition.start();
//   currentColor = colors[Math.floor(Math.random() * colors.length)];
//   colorHTML =
//     '<span style="background-color:' +
//     currentColor +
//     ';"> ' +
//     currentColor +
//     " </span>";
//   hints.innerHTML = colorHTML;
//   console.log("Ready to receive a color command.");
// };

function start() {
  // recognition.start();
  // currentColor = "시작";
  // colorHTML =
  //   '<span style="background-color:' +
  //   currentColor +
  //   ';"> ' +
  //   currentColor +
  //   " </span>";
  // hints.innerHTML = colorHTML;
  // console.log("시작! 하고 말하면 시작한다.");

  setTimeout(function () {
    recognition.start();
    currentColor = "시작";
    colorHTML =
      '<span style="background-color:' +
      currentColor +
      ';"> ' +
      currentColor +
      " </span>";
    hints.innerHTML = colorHTML;
    console.log("시작! 하고 말하면 시작한다.");
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
  var color = event.results[0][0].transcript;
  diagnostic.textContent = "제출: " + color;
  if (color === currentColor) {
    result.innerHTML = "정답: " + currentColor + " - " + color;
  } else {
    result.innerHTML = "오답: " + currentColor + " - " + color;
  }
  // bg.style.backgroundColor = color;
  console.log("Confidence: " + event.results[0][0].confidence);
  // setTimeout(restart(), 1000);

  recognition.start();
  currentColor = colors[Math.floor(Math.random() * colors.length)];
  colorHTML =
    '<span style="background-color:' +
    currentColor +
    ';"> ' +
    currentColor +
    " </span>";
  hints.innerHTML = colorHTML;
  console.log("Ready to receive a color command.");
};

function restart() {
  recognition.start();
  currentColor = colors[Math.floor(Math.random() * colors.length)];
  colorHTML =
    '<span style="background-color:' +
    currentColor +
    ';"> ' +
    currentColor +
    " </span>";
  hints.innerHTML = colorHTML;
  console.log("Ready to receive a color command.");
}

recognition.onspeechend = function () {
  recognition.stop();
};

recognition.onnomatch = function (event) {
  diagnostic.textContent = "I didn't recognise that color.";
};

recognition.onerror = function (event) {
  diagnostic.textContent = "Error occurred in recognition: " + event.error;
};
