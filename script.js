```javascript
/* =========================================
   JIFUNZEKIKOREA
   MAIN JAVASCRIPT
========================================= */


/* =========================================
   MOBILE MENU
========================================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", function () {
        navLinks.classList.toggle("active");
        menuToggle.classList.toggle("active");
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            navLinks.classList.remove("active");
            menuToggle.classList.remove("active");
        });
    });
}


/* =========================================
   SMOOTH SCROLLING
========================================= */

document.querySelectorAll('a[href^="#"]').forEach(function (link) {

    link.addEventListener("click", function (event) {

        const targetId = this.getAttribute("href");

        if (targetId === "#") return;

        const target = document.querySelector(targetId);

        if (target) {
            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }

    });

});


/* =========================================
   KOREAN PRONUNCIATION
========================================= */

function speak(text) {

    if (!("speechSynthesis" in window)) {
        alert("Your browser does not support Korean pronunciation.");
        return;
    }

    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(text);

    speech.lang = "ko-KR";
    speech.rate = 0.8;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
}


/* =========================================
   WORD OF THE DAY
========================================= */

const wordsOfTheDay = [

    {
        korean: "안녕하세요",
        romanization: "Annyeonghaseyo",
        english: "Hello",
        swahili: "Habari"
    },

    {
        korean: "감사합니다",
        romanization: "Gamsahamnida",
        english: "Thank you",
        swahili: "Asante"
    },

    {
        korean: "사랑",
        romanization: "Sarang",
        english: "Love",
        swahili: "Upendo"
    },

    {
        korean: "친구",
        romanization: "Chingu",
        english: "Friend",
        swahili: "Rafiki"
    },

    {
        korean: "학교",
        romanization: "Hakgyo",
        english: "School",
        swahili: "Shule"
    },

    {
        korean: "물",
        romanization: "Mul",
        english: "Water",
        swahili: "Maji"
    },

    {
        korean: "가족",
        romanization: "Gajok",
        english: "Family",
        swahili: "Familia"
    }
];


function showWordOfTheDay() {

    const koreanElement = document.getElementById("wordKorean");
    const romanizationElement = document.getElementById("wordRomanization");
    const englishElement = document.getElementById("wordEnglish");
    const swahiliElement = document.getElementById("wordSwahili");

    if (!koreanElement) return;

    const today = new Date();

    const index =
        (today.getFullYear() +
        today.getMonth() +
        today.getDate()) %
        wordsOfTheDay.length;

    const word = wordsOfTheDay[index];

    koreanElement.textContent = word.korean;
    romanizationElement.textContent = word.romanization;
    englishElement.textContent = word.english;
    swahiliElement.textContent = word.swahili;
}

showWordOfTheDay();


/* =========================================
   QUIZ DATA
========================================= */

const quizQuestions = [

    {
        question: "What does 안녕하세요 mean?",
        options: [
            "Goodbye",
            "Hello",
            "Thank you",
            "Good night"
        ],
        answer: "Hello"
    },

    {
        question: "What does 감사합니다 mean?",
        options: [
            "Sorry",
            "Hello",
            "Thank you",
            "Please"
        ],
        answer: "Thank you"
    },

    {
        question: "What does 물 mean?",
        options: [
            "Food",
            "Water",
            "Milk",
            "Coffee"
        ],
        answer: "Water"
    },

    {
        question: "What does 학교 mean?",
        options: [
            "House",
            "Office",
            "School",
            "Hospital"
        ],
        answer: "School"
    },

    {
        question: "What does 친구 mean?",
        options: [
            "Teacher",
            "Friend",
            "Mother",
            "Student"
        ],
        answer: "Friend"
    },

    {
        question: "What does 사랑 mean?",
        options: [
            "Love",
            "Family",
            "Friend",
            "Peace"
        ],
        answer: "Love"
    },

    {
        question: "What does 가족 mean?",
        options: [
            "Friend",
            "Family",
            "School",
            "Teacher"
        ],
        answer: "Family"
    }
];


let currentQuestion = 0;
let quizScore = 0;


/* =========================================
   QUIZ ELEMENTS
========================================= */

const quizBox = document.getElementById("quizBox");
const quizQuestion = document.getElementById("quizQuestion");
const quizOptions = document.getElementById("quizOptions");
const quizNext = document.getElementById("quizNext");
const quizResult = document.getElementById("quizResult");


/* =========================================
   START QUIZ
========================================= */

function startQuiz() {

    currentQuestion = 0;
    quizScore = 0;

    if (quizResult) {
        quizResult.textContent = "";
    }

    showQuestion();
}


/* =========================================
   SHOW QUESTION
========================================= */

function showQuestion() {

    if (!quizQuestion || !quizOptions) return;

    const question = quizQuestions[currentQuestion];

    quizQuestion.textContent =
        `${currentQuestion + 1}. ${question.question}`;

    quizOptions.innerHTML = "";

    question.options.forEach(function (option) {

        const button = document.createElement("button");

        button.textContent = option;
        button.className = "quiz-option";

        button.addEventListener("click", function () {

            checkAnswer(option, button);

        });

        quizOptions.appendChild(button);

    });

    if (quizNext) {
        quizNext.style.display = "none";
    }
}


/* =========================================
   CHECK ANSWER
========================================= */

function checkAnswer(selectedAnswer, selectedButton) {

    const correctAnswer =
        quizQuestions[currentQuestion].answer;

    const allButtons =
        quizOptions.querySelectorAll("button");

    // Prevent clicking multiple answers
    allButtons.forEach(function (button) {
        button.disabled = true;
    });

    if (selectedAnswer === correctAnswer) {

        selectedButton.classList.add("correct");

        quizScore++;

    } else {

        selectedButton.classList.add("wrong");

        allButtons.forEach(function (button) {

            if (button.textContent === correctAnswer) {
                button.classList.add("correct");
            }

        });

    }

    if (quizNext) {
        quizNext.style.display = "inline-flex";
    }
}


/* =========================================
   NEXT QUESTION
========================================= */

if (quizNext) {

    quizNext.addEventListener("click", function () {

        currentQuestion++;

        if (currentQuestion < quizQuestions.length) {

            showQuestion();

        } else {

            finishQuiz();

        }

    });

}


/* =========================================
   FINISH QUIZ
========================================= */

function finishQuiz() {

    if (!quizQuestion || !quizOptions) return;

    quizQuestion.textContent = "Quiz Complete!";

    quizOptions.innerHTML = "";

    const percentage =
        Math.round(
            (quizScore / quizQuestions.length) * 100
        );

    if (quizResult) {

        quizResult.innerHTML = `
            You scored <strong>${quizScore}</strong>
            out of <strong>${quizQuestions.length}</strong>
            (${percentage}%).
        `;

    }

    if (quizNext) {
        quizNext.style.display = "none";
    }
}


/* =========================================
   INITIALIZE QUIZ
========================================= */

if (quizQuestion && quizOptions) {
    showQuestion();
}


/* =========================================
   PREMIUM BUTTON
========================================= */

/*
   Payment will be connected later.

   For now, we keep the function so the
   Premium button does not produce an
   "openPayment is not defined" error.
*/

function openPayment() {

    alert(
        "Premium payment will be available soon. " +
        "We are currently completing the learning content."
    );

}


/* =========================================
   GENERAL BUTTON FEEDBACK
========================================= */

document.querySelectorAll(".speak-btn").forEach(function (button) {

    button.addEventListener("click", function () {

        const koreanText =
            this.getAttribute("data-korean");

        if (koreanText) {
            speak(koreanText);
        }

    });

});


/* =========================================
   CONSOLE MESSAGE
========================================= */

console.log(
    "JifunzeKikorea is ready 🇰🇷"
);
```
