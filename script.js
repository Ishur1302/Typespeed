const sampleText = "The quick brown fox jumps over the lazy dog.";
const textBox = document.getElementById("text-box");
const inputBox = document.getElementById("input-box");
const timerDisplay = document.getElementById("timer");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");

let timeLeft = 60;
let interval;
let correctChars = 0;
let totalTyped = 0;
let started = false;

// Display sample text
textBox.innerText = sampleText;

function startTimer() {
    interval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            timerDisplay.innerText = timeLeft;
        } else {
            clearInterval(interval);
            inputBox.disabled = true;
        }
    }, 1000);
}

function checkTyping() {
    if (!started) {
        started = true;
        startTimer();
    }

    const typedText = inputBox.value;
    totalTyped = typedText.length;
    
    correctChars = 0;
    for (let i = 0; i < typedText.length; i++) {
        if (typedText[i] === sampleText[i]) {
            correctChars++;
        }
    }

    let wordsTyped = totalTyped / 5;
    let minutes = (60 - timeLeft) / 60;
    let wpm = minutes > 0 ? Math.round(wordsTyped / minutes) : 0;
    
    let accuracy = totalTyped > 0 ? Math.round((correctChars / totalTyped) * 100) : 100;

    wpmDisplay.innerText = wpm;
    accuracyDisplay.innerText = accuracy;
}

function resetTest() {
    clearInterval(interval);
    inputBox.disabled = false;
    inputBox.value = "";
    timeLeft = 60;
    timerDisplay.innerText = "60";
    wpmDisplay.innerText = "0";
    accuracyDisplay.innerText = "100";
    started = false;
    correctChars = 0;
    totalTyped = 0;
}