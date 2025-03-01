// Sample Sentences for Random Selection
const sentences = [
    "The quick brown fox jumps over the lazy dog.",
    "Programming is fun when you understand the logic.",
    "Speed typing tests help improve accuracy and efficiency.",
    "Artificial Intelligence is shaping the future.",
    "JavaScript is a versatile language for web development.",
    "Cloud computing is revolutionizing the IT industry.",
    "Open-source software contributes to technological innovation."
];

let currentSentence = "";
let timeLeft = 60;
let interval;
let correctChars = 0;
let totalTyped = 0;
let started = false;

// Select Random Sentence
function loadNewSentence() {
    currentSentence = sentences[Math.floor(Math.random() * sentences.length)];
    const textBox = document.getElementById("text-box");
    textBox.innerHTML = "";

    // Wrap each letter in a span for real-time feedback
    for (let char of currentSentence) {
        let span = document.createElement("span");
        span.innerText = char;
        textBox.appendChild(span);
    }
}

// Timer Function
function startTimer() {
    interval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            document.getElementById("timer").innerText = timeLeft;
        } else {
            clearInterval(interval);
            document.getElementById("input-box").disabled = true;
        }
    }, 1000);
}

// Typing Check
function checkTyping() {
    if (!started) {
        started = true;
        startTimer();
    }

    let inputText = document.getElementById("input-box").value;
    let textBoxSpans = document.getElementById("text-box").children;
    
    correctChars = 0;
    totalTyped = inputText.length;
    
    // Highlight Correct & Incorrect Letters
    for (let i = 0; i < textBoxSpans.length; i++) {
        if (i < inputText.length) {
            if (inputText[i] === currentSentence[i]) {
                textBoxSpans[i].style.color = "green";
                correctChars++;
            } else {
                textBoxSpans[i].style.color = "red";
            }
        } else {
            textBoxSpans[i].style.color = "black";
        }
    }

    // Calculate WPM & Accuracy
    let wordsTyped = totalTyped / 5;
    let minutes = (60 - timeLeft) / 60;
    let wpm = minutes > 0 ? Math.round(wordsTyped / minutes) : 0;
    
    let accuracy = totalTyped > 0 ? Math.round((correctChars / totalTyped) * 100) : 100;

    document.getElementById("wpm").innerText = wpm;
    document.getElementById("accuracy").innerText = accuracy;
}

// Restart Test
function resetTest() {
    clearInterval(interval);
    document.getElementById("input-box").disabled = false;
    document.getElementById("input-box").value = "";
    timeLeft = 60;
    document.getElementById("timer").innerText = "60";
    document.getElementById("wpm").innerText = "0";
    document.getElementById("accuracy").innerText = "100";
    started = false;
    correctChars = 0;
    totalTyped = 0;
    loadNewSentence();
}

// Load a New Sentence on Page Load
window.onload = loadNewSentence;
