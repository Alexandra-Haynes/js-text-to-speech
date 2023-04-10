const playButton = document.getElementById("play-button");
const pauseButton = document.getElementById("pause-button");
const stopButton = document.getElementById("stop-button");
const textInput = document.getElementById("text");
const speedInput = document.getElementById("speed");
let currentCharacter;

playButton.addEventListener("click", () => {
  readText(textInput.value);
});
pauseButton.addEventListener("click", pauseReading);
stopButton.addEventListener("click", stopReading);

speedInput.addEventListener("input", () => {
  stopReading();
  readText(utterance.text.substring(currentCharacter));
});

// Web Speech API speechSynthesis
//speechSynthesisUtterance() is a speech request,
//containing the content to read and the info about how to read

const utterance = new SpeechSynthesisUtterance(text);

utterance.addEventListener("end", () => {
  textInput.disabled = false;
});
//to change the speed while reading:
utterance.addEventListener("boundary", (e) => {
  currentCharacter = e.charIndex; //the word we are on
});

function readText(text) {
  if (speechSynthesis.paused && speechSynthesis.speaking) {
    return speechSynthesis.resume();
  }
   if (speechSynthesis.speaking) return;
   utterance.text = text;
   utterance.rate = speedInput.value || 1;
  //when is reading, we want to disable the input
  textInput.disabled = true;
  speechSynthesis.speak(utterance);
}

function pauseReading() {
  if (speechSynthesis.speaking) speechSynthesis.pause();
}

function stopReading() {
  speechSynthesis.resume(); //reset from the beginning
  speechSynthesis.cancel();
}
