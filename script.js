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
``````javascript
/* =========================================
   300 KOREAN VOCABULARY DATABASE
========================================= */

const vocabulary = [

    /* =========================
       1. COLOURS — 20
    ========================= */

    { category: "Colours", korean: "빨간색", romanization: "ppalgansaek", english: "Red", swahili: "Nyekundu" },
    { category: "Colours", korean: "파란색", romanization: "paransaek", english: "Blue", swahili: "Bluu" },
    { category: "Colours", korean: "노란색", romanization: "noransaek", english: "Yellow", swahili: "Njano" },
    { category: "Colours", korean: "초록색", romanization: "choroksaek", english: "Green", swahili: "Kijani" },
    { category: "Colours", korean: "주황색", romanization: "juhwangsaek", english: "Orange", swahili: "Machungwa" },
    { category: "Colours", korean: "보라색", romanization: "borasaek", english: "Purple", swahili: "Zambarau" },
    { category: "Colours", korean: "분홍색", romanization: "bunhongsaek", english: "Pink", swahili: "Waridi" },
    { category: "Colours", korean: "검은색", romanization: "geomeunsaek", english: "Black", swahili: "Nyeusi" },
    { category: "Colours", korean: "흰색", romanization: "huinsaek", english: "White", swahili: "Nyeupe" },
    { category: "Colours", korean: "갈색", romanization: "galsaek", english: "Brown", swahili: "Kahawia" },
    { category: "Colours", korean: "회색", romanization: "hoesaek", english: "Gray", swahili: "Kijivu" },
    { category: "Colours", korean: "금색", romanization: "geumsaek", english: "Gold", swahili: "Dhahabu" },
    { category: "Colours", korean: "은색", romanization: "eunsaek", english: "Silver", swahili: "Fedha" },
    { category: "Colours", korean: "하늘색", romanization: "haneulsaek", english: "Sky blue", swahili: "Bluu ya anga" },
    { category: "Colours", korean: "남색", romanization: "namsaek", english: "Navy blue", swahili: "Bluu iliyokolea" },
    { category: "Colours", korean: "연두색", romanization: "yeondusaek", english: "Light green", swahili: "Kijani hafifu" },
    { category: "Colours", korean: "연보라색", romanization: "yeonborasaek", english: "Light purple", swahili: "Zambarau hafifu" },
    { category: "Colours", korean: "연분홍색", romanization: "yeonbunhongsaek", english: "Light pink", swahili: "Waridi hafifu" },
    { category: "Colours", korean: "진한 파란색", romanization: "jinhan paransaek", english: "Dark blue", swahili: "Bluu iliyokolea" },
    { category: "Colours", korean: "색", romanization: "saek", english: "Color", swahili: "Rangi" },


    /* =========================
       2. DAYS — 7
    ========================= */

    { category: "Days", korean: "월요일", romanization: "woryoil", english: "Monday", swahili: "Jumatatu" },
    { category: "Days", korean: "화요일", romanization: "hwayoil", english: "Tuesday", swahili: "Jumanne" },
    { category: "Days", korean: "수요일", romanization: "suyoil", english: "Wednesday", swahili: "Jumatano" },
    { category: "Days", korean: "목요일", romanization: "mogyoil", english: "Thursday", swahili: "Alhamisi" },
    { category: "Days", korean: "금요일", romanization: "geumyoil", english: "Friday", swahili: "Ijumaa" },
    { category: "Days", korean: "토요일", romanization: "toyoil", english: "Saturday", swahili: "Jumamosi" },
    { category: "Days", korean: "일요일", romanization: "iryoil", english: "Sunday", swahili: "Jumapili" },


    /* =========================
       3. MONTHS — 12
    ========================= */

    { category: "Months", korean: "일월", romanization: "irwol", english: "January", swahili: "Januari" },
    { category: "Months", korean: "이월", romanization: "iwol", english: "February", swahili: "Februari" },
    { category: "Months", korean: "삼월", romanization: "samwol", english: "March", swahili: "Machi" },
    { category: "Months", korean: "사월", romanization: "sawol", english: "April", swahili: "Aprili" },
    { category: "Months", korean: "오월", romanization: "owol", english: "May", swahili: "Mei" },
    { category: "Months", korean: "유월", romanization: "yuwol", english: "June", swahili: "Juni" },
    { category: "Months", korean: "칠월", romanization: "chirwol", english: "July", swahili: "Julai" },
    { category: "Months", korean: "팔월", romanization: "parwol", english: "August", swahili: "Agosti" },
    { category: "Months", korean: "구월", romanization: "guwol", english: "September", swahili: "Septemba" },
    { category: "Months", korean: "시월", romanization: "siwol", english: "October", swahili: "Oktoba" },
    { category: "Months", korean: "십일월", romanization: "sibirwol", english: "November", swahili: "Novemba" },
    { category: "Months", korean: "십이월", romanization: "sibiwol", english: "December", swahili: "Desemba" },


    /* =========================
       4. FAMILY & PEOPLE — 30
    ========================= */

    { category: "Family & People", korean: "가족", romanization: "gajok", english: "Family", swahili: "Familia" },
    { category: "Family & People", korean: "사람", romanization: "saram", english: "Person", swahili: "Mtu" },
    { category: "Family & People", korean: "남자", romanization: "namja", english: "Man", swahili: "Mwanaume" },
    { category: "Family & People", korean: "여자", romanization: "yeoja", english: "Woman", swahili: "Mwanamke" },
    { category: "Family & People", korean: "아이", romanization: "ai", english: "Child", swahili: "Mtoto" },
    { category: "Family & People", korean: "아기", romanization: "agi", english: "Baby", swahili: "Mtoto mchanga" },
    { category: "Family & People", korean: "아버지", romanization: "abeoji", english: "Father", swahili: "Baba" },
    { category: "Family & People", korean: "어머니", romanization: "eomeoni", english: "Mother", swahili: "Mama" },
    { category: "Family & People", korean: "아빠", romanization: "appa", english: "Dad", swahili: "Baba" },
    { category: "Family & People", korean: "엄마", romanization: "eomma", english: "Mom", swahili: "Mama" },
    { category: "Family & People", korean: "부모님", romanization: "bumonim", english: "Parents", swahili: "Wazazi" },
    { category: "Family & People", korean: "형", romanization: "hyeong", english: "Older brother (male speaker)", swahili: "Kaka mkubwa" },
    { category: "Family & People", korean: "오빠", romanization: "oppa", english: "Older brother (female speaker)", swahili: "Kaka mkubwa" },
    { category: "Family & People", korean: "누나", romanization: "nuna", english: "Older sister (male speaker)", swahili: "Dada mkubwa" },
    { category: "Family & People", korean: "언니", romanization: "eonni", english: "Older sister (female speaker)", swahili: "Dada mkubwa" },
    { category: "Family & People", korean: "동생", romanization: "dongsaeng", english: "Younger sibling", swahili: "Mdogo" },
    { category: "Family & People", korean: "남동생", romanization: "namdongsaeng", english: "Younger brother", swahili: "Kaka/mdogo wa kiume" },
    { category: "Family & People", korean: "여동생", romanization: "yeodongsaeng", english: "Younger sister", swahili: "Dada/mdogo wa kike" },
    { category: "Family & People", korean: "할아버지", romanization: "harabeoji", english: "Grandfather", swahili: "Babu" },
    { category: "Family & People", korean: "할머니", romanization: "halmeoni", english: "Grandmother", swahili: "Bibi" },
    { category: "Family & People", korean: "아들", romanization: "adeul", english: "Son", swahili: "Mwana wa kiume" },
    { category: "Family & People", korean: "딸", romanization: "ttal", english: "Daughter", swahili: "Mwana wa kike" },
    { category: "Family & People", korean: "남편", romanization: "nampyeon", english: "Husband", swahili: "Mume" },
    { category: "Family & People", korean: "아내", romanization: "anae", english: "Wife", swahili: "Mke" },
    { category: "Family & People", korean: "친구", romanization: "chingu", english: "Friend", swahili: "Rafiki" },
    { category: "Family & People", korean: "선생님", romanization: "seonsaengnim", english: "Teacher", swahili: "Mwalimu" },
    { category: "Family & People", korean: "학생", romanization: "haksaeng", english: "Student", swahili: "Mwanafunzi" },
    { category: "Family & People", korean: "의사", romanization: "uisa", english: "Doctor", swahili: "Daktari" },
    { category: "Family & People", korean: "간호사", romanization: "ganhosa", english: "Nurse", swahili: "Muuguzi" },
    { category: "Family & People", korean: "경찰", romanization: "gyeongchal", english: "Police officer", swahili: "Polisi" },


    /* =========================
       5. TIME & DATES — 25
    ========================= */

    { category: "Time & Dates", korean: "시간", romanization: "sigan", english: "Time", swahili: "Muda" },
    { category: "Time & Dates", korean: "오늘", romanization: "oneul", english: "Today", swahili: "Leo" },
    { category: "Time & Dates", korean: "어제", romanization: "eoje", english: "Yesterday", swahili: "Jana" },
    { category: "Time & Dates", korean: "내일", romanization: "naeil", english: "Tomorrow", swahili: "Kesho" },
    { category: "Time & Dates", korean: "지금", romanization: "jigeum", english: "Now", swahili: "Sasa" },
    { category: "Time & Dates", korean: "아침", romanization: "achim", english: "Morning", swahili: "Asubuhi" },
    { category: "Time & Dates", korean: "점심", romanization: "jeomsim", english: "Lunch / noon", swahili: "Mchana / chakula cha mchana" },
    { category: "Time & Dates", korean: "저녁", romanization: "jeonyeok", english: "Evening / dinner", swahili: "Jioni / chakula cha jioni" },
    { category: "Time & Dates", korean: "밤", romanization: "bam", english: "Night", swahili: "Usiku" },
    { category: "Time & Dates", korean: "새벽", romanization: "saebyeok", english: "Dawn / early morning", swahili: "Alfajiri" },
    { category: "Time & Dates", korean: "분", romanization: "bun", english: "Minute", swahili: "Dakika" },
    { category: "Time & Dates", korean: "초", romanization: "cho", english: "Second", swahili: "Sekunde" },
    { category: "Time & Dates", korean: "시", romanization: "si", english: "Hour", swahili: "Saa" },
    { category: "Time & Dates", korean: "주", romanization: "ju", english: "Week", swahili: "Wiki" },
    { category: "Time & Dates", korean: "달", romanization: "dal", english: "Month", swahili: "Mwezi" },
    { category: "Time & Dates", korean: "년", romanization: "nyeon", english: "Year", swahili: "Mwaka" },
    { category: "Time & Dates", korean: "날짜", romanization: "naljja", english: "Date", swahili: "Tarehe" },
    { category: "Time & Dates", korean: "생일", romanization: "saengil", english: "Birthday", swahili: "Siku ya kuzaliwa" },
    { category: "Time & Dates", korean: "주말", romanization: "jumal", english: "Weekend", swahili: "Mwisho wa wiki" },
    { category: "Time & Dates", korean: "평일", romanization: "pyeongil", english: "Weekday", swahili: "Siku ya kazi" },
    { category: "Time & Dates", korean: "매일", romanization: "maeil", english: "Every day", swahili: "Kila siku" },
    { category: "Time & Dates", korean: "매주", romanization: "maeju", english: "Every week", swahili: "Kila wiki" },
    { category: "Time & Dates", korean: "매달", romanization: "maedal", english: "Every month", swahili: "Kila mwezi" },
    { category: "Time & Dates", korean: "매년", romanization: "maenyeon", english: "Every year", swahili: "Kila mwaka" },
    { category: "Time & Dates", korean: "언제", romanization: "eonje", english: "When", swahili: "Lini" },


    /* =========================
       6. HOUSE & HOUSEHOLD — 30
    ========================= */

    { category: "House & Household", korean: "집", romanization: "jip", english: "House / home", swahili: "Nyumba / nyumbani" },
    { category: "House & Household", korean: "방", romanization: "bang", english: "Room", swahili: "Chumba" },
    { category: "House & Household", korean: "거실", romanization: "geosil", english: "Living room", swahili: "Sebule" },
    { category: "House & Household", korean: "부엌", romanization: "bueok", english: "Kitchen", swahili: "Jikoni" },
    { category: "House & Household", korean: "화장실", romanization: "hwajangsil", english: "Bathroom / toilet", swahili: "Bafu / choo" },
    { category: "House & Household", korean: "침실", romanization: "chimsil", english: "Bedroom", swahili: "Chumba cha kulala" },
    { category: "House & Household", korean: "문", romanization: "mun", english: "Door", swahili: "Mlango" },
    { category: "House & Household", korean: "창문", romanization: "changmun", english: "Window", swahili: "Dirisha" },
    { category: "House & Household", korean: "책상", romanization: "chaeksang", english: "Desk", swahili: "Dawati" },
    { category: "House & Household", korean: "의자", romanization: "uija", english: "Chair", swahili: "Kiti" },
    { category: "House & Household", korean: "침대", romanization: "chimdae", english: "Bed", swahili: "Kitanda" },
    { category: "House & Household", korean: "소파", romanization: "sopa", english: "Sofa", swahili: "Sofa" },
    { category: "House & Household", korean: "텔레비전", romanization: "tellebijeon", english: "Television", swahili: "Televisheni" },
    { category: "House & Household", korean: "냉장고", romanization: "naengjanggo", english: "Refrigerator", swahili: "Friji" },
    { category: "House & Household", korean: "세탁기", romanization: "setakgi", english: "Washing machine", swahili: "Mashine ya kufulia" },
    { category: "House & Household", korean: "컴퓨터", romanization: "keompyuteo", english: "Computer", swahili: "Kompyuta" },
    { category: "House & Household", korean: "전화", romanization: "jeonhwa", english: "Telephone", swahili: "Simu" },
    { category: "House & Household", korean: "휴대폰", romanization: "hyudaepon", english: "Mobile phone", swahili: "Simu ya mkononi" },
    { category: "House & Household", korean: "열쇠", romanization: "yeolsoe", english: "Key", swahili: "Ufunguo" },
    { category: "House & Household", korean: "가방", romanization: "gabang", english: "Bag", swahili: "Mfuko / begi" },
    { category: "House & Household", korean: "책", romanization: "chaek", english: "Book", swahili: "Kitabu" },
    { category: "House & Household", korean: "펜", romanization: "pen", english: "Pen", swahili: "Kalamu" },
    { category: "House & Household", korean: "연필", romanization: "yeonpil", english: "Pencil", swahili: "Penseli" },
    { category: "House & Household", korean: "종이", romanization: "jongi", english: "Paper", swahili: "Karatasi" },
    { category: "House & Household", korean: "컵", romanization: "keop", english: "Cup", swahili: "Kikombe" },
    { category: "House & Household", korean: "접시", romanization: "jeopsi", english: "Plate", swahili: "Sahani" },
    { category: "House & Household", korean: "숟가락", romanization: "sutgarak", english: "Spoon", swahili: "Kijiko" },
    { category: "House & Household", korean: "젓가락", romanization: "jeotgarak", english: "Chopsticks", swahili: "Vijiti vya kula" },
    { category: "House & Household", korean: "수건", romanization: "sugeon", english: "Towel", swahili: "Taulo" },
    { category: "House & Household", korean: "거울", romanization: "geoul", english: "Mirror", swahili: "Kioo" },


    /* =========================
       7. SCHOOL — 25
    ========================= */

    { category: "School", korean: "학교", romanization: "hakgyo", english: "School", swahili: "Shule" },
    { category: "School", korean: "교실", romanization: "gyosil", english: "Classroom", swahili: "Darasa" },
    { category: "School", korean: "학생", romanization: "haksaeng", english: "Student", swahili: "Mwanafunzi" },
    { category: "School", korean: "선생님", romanization: "seonsaengnim", english: "Teacher", swahili: "Mwalimu" },
    { category: "School", korean: "교장", romanization: "gyojang", english: "Principal", swahili: "Mkuu wa shule" },
    { category: "School", korean: "수업", romanization: "sueop", english: "Lesson / class", swahili: "Somo / darasa" },
    { category: "School", korean: "숙제", romanization: "sukje", english: "Homework", swahili: "Kazi ya nyumbani" },
    { category: "School", korean: "시험", romanization: "siheom", english: "Exam", swahili: "Mtihani" },
    { category: "School", korean: "문제", romanization: "munje", english: "Question / problem", swahili: "Swali / tatizo" },
    { category: "School", korean: "답", romanization: "dap", english: "Answer", swahili: "Jibu" },
    { category: "School", korean: "공부", romanization: "gongbu", english: "Study", swahili: "Kusoma" },
    { category: "School", korean: "도서관", romanization: "doseogwan", english: "Library", swahili: "Maktaba" },
    { category: "School", korean: "운동장", romanization: "undongjang", english: "Playground / sports field", swahili: "Uwanja wa michezo" },
    { category: "School", korean: "교과서", romanization: "gyogwaseo", english: "Textbook", swahili: "Kitabu cha kiada" },
    { category: "School", korean: "공책", romanization: "gongchaek", english: "Notebook", swahili: "Daftari" },
    { category: "School", korean: "칠판", romanization: "chilpan", english: "Blackboard", swahili: "Ubao" },
    { category: "School", korean: "수학", romanization: "suhak", english: "Mathematics", swahili: "Hisabati" },
    { category: "School", korean: "과학", romanization: "gwahak", english: "Science", swahili: "Sayansi" },
    { category: "School", korean: "영어", romanization: "yeongeo", english: "English", swahili: "Kiingereza" },
    { category: "School", korean: "한국어", romanization: "hangugeo", english: "Korean language", swahili: "Lugha ya Kikorea" },
    { category: "School", korean: "역사", romanization: "yeoksa", english: "History", swahili: "Historia" },
    { category: "School", korean: "미술", romanization: "misul", english: "Art", swahili: "Sanaa" },
    { category: "School", korean: "음악", romanization: "eumak", english: "Music", swahili: "Muziki" },
    { category: "School", korean: "체육", romanization: "cheyuk", english: "Physical education", swahili: "Elimu ya michezo" },
    { category: "School", korean: "졸업", romanization: "joreop", english: "Graduation", swahili: "Mahafali" },


    /* =========================
       8. UNIVERSITY — 20
    ========================= */

    { category: "University", korean: "대학교", romanization: "daehakgyo", english: "University", swahili: "Chuo kikuu" },
    { category: "University", korean: "대학생", romanization: "daehaksaeng", english: "University student", swahili: "Mwanafunzi wa chuo kikuu" },
    { category: "University", korean: "교수", romanization: "gyosu", english: "Professor", swahili: "Profesa" },
    { category: "University", korean: "학과", romanization: "hakgwa", english: "Department / major", swahili: "Idara / fani" },
    { category: "University", korean: "전공", romanization: "jeongong", english: "Major", swahili: "Fani kuu" },
    { category: "University", korean: "학기", romanization: "hakgi", english: "Semester", swahili: "Muhula" },
    { category: "University", korean: "강의", romanization: "gangui", english: "Lecture", swahili: "Mhadhara" },
    { category: "University", korean: "과제", romanization: "gwaje", english: "Assignment", swahili: "Kazi ya darasani" },
    { category: "University", korean: "졸업식", romanization: "joreopsik", english: "Graduation ceremony", swahili: "Sherehe ya mahafali" },
    { category: "University", korean: "학위", romanization: "hagwi", english: "Academic degree", swahili: "Shahada" },
    { category: "University", korean: "학사", romanization: "haksa", english: "Bachelor's degree", swahili: "Shahada ya kwanza" },
    { category: "University", korean: "석사", romanization: "seoksa", english: "Master's degree", swahili: "Shahada ya uzamili" },
    { category: "University", korean: "박사", romanization: "baksa", english: "Doctorate", swahili: "Shahada ya uzamivu" },
    { category: "University", korean: "도서관", romanization: "doseogwan", english: "Library", swahili: "Maktaba" },
    { category: "University", korean: "연구", romanization: "yeongu", english: "Research", swahili: "Utafiti" },
    { category: "University", korean: "논문", romanization: "nonmun", english: "Academic paper / thesis", swahili: "Tasnifu / makala ya kitaaluma" },
    { category: "University", korean: "시험", romanization: "siheom", english: "Exam", swahili: "Mtihani" },
    { category: "University", korean: "등록", romanization: "deungnok", english: "Registration", swahili: "Usajili" },
    { category: "University", korean: "장학금", romanization: "janghakgeum", english: "Scholarship", swahili: "Ufadhili wa masomo" },
    { category: "University", korean: "기숙사", romanization: "gisuksa", english: "Dormitory", swahili: "Hosteli ya chuo" },


    /* =========================
       9. OFFICE & WORK — 25
    ========================= */

    { category: "Office & Work", korean: "회사", romanization: "hoesa", english: "Company", swahili: "Kampuni" },
    { category: "Office & Work", korean: "직장", romanization: "jikjang", english: "Workplace", swahili: "Mahali pa kazi" },
    { category: "Office & Work", korean: "직원", romanization: "jigwon", english: "Employee", swahili: "Mfanyakazi" },
    { category: "Office & Work", korean: "사장님", romanization: "sajangnim", english: "Company president / boss", swahili: "Mkurugenzi / bosi" },
    { category: "Office & Work", korean: "부장", romanization: "bujang", english: "Department manager", swahili: "Meneja wa idara" },
    { category: "Office & Work", korean: "회의", romanization: "hoeui", english: "Meeting", swahili: "Mkutano" },
    { category: "Office & Work", korean: "일", romanization: "il", english: "Work", swahili: "Kazi" },
    { category: "Office & Work", korean: "업무", romanization: "eopmu", english: "Work duties", swahili: "Majukumu ya kazi" },
    { category: "Office & Work", korean: "월급", romanization: "wolgeup", english: "Monthly salary", swahili: "Mshahara wa mwezi" },
    { category: "Office & Work", korean: "월요일", romanization: "woryoil", english: "Monday", swahili: "Jumatatu" },
    { category: "Office & Work", korean: "출근", romanization: "chulgeun", english: "Going to work", swahili: "Kwenda kazini" },
    { category: "Office & Work", korean: "퇴근", romanization: "toegeun", english: "Leaving work", swahili: "Kutoka kazini" },
    { category: "Office & Work", korean: "휴가", romanization: "hyuga", english: "Vacation / leave", swahili: "Likizo" },
    { category: "Office & Work", korean: "출장", romanization: "chuljang", english: "Business trip", swahili: "Safari ya kikazi" },
    { category: "Office & Work", korean: "컴퓨터", romanization: "keompyuteo", english: "Computer", swahili: "Kompyuta" },
    { category: "Office & Work", korean: "프린터", romanization: "peurinteo", english: "Printer", swahili: "Printa" },
    { category: "Office & Work", korean: "이메일", romanization: "imeil", english: "Email", swahili: "Barua pepe" },
    { category: "Office & Work", korean: "전화", romanization: "jeonhwa", english: "Telephone / call", swahili: "Simu" },
    { category: "Office & Work", korean: "회의실", romanization: "hoeuisil", english: "Meeting room", swahili: "Chumba cha mikutano" },
    { category: "Office & Work", korean: "책상", romanization: "chaeksang", english: "Desk", swahili: "Dawati" },
    { category: "Office & Work", korean: "서류", romanization: "seoryu", english: "Documents", swahili: "Nyaraka" },
    { category: "Office & Work", korean: "계약", romanization: "gyeyak", english: "Contract", swahili: "Mkataba" },
    { category: "Office & Work", korean: "고객", romanization: "gogaek", english: "Customer / client", swahili: "Mteja" },
    { category: "Office & Work", korean: "사업", romanization: "saeop", english: "Business", swahili: "Biashara" },
    { category: "Office & Work", korean: "회사원", romanization: "hoesawon", english: "Office worker", swahili: "Mfanyakazi wa ofisini" },


    /* =========================
       10. DRINKS — 15
    ========================= */

    { category: "Drinks", korean: "물", romanization: "mul", english: "Water", swahili: "Maji" },
    { category: "Drinks", korean: "커피", romanization: "keopi", english: "Coffee", swahili: "Kahawa" },
    { category: "Drinks", korean: "차", romanization: "cha", english: "Tea", swahili: "Chai" },
    { category: "Drinks", korean: "우유", romanization: "uyu", english: "Milk", swahili: "Maziwa" },
    { category: "Drinks", korean: "주스", romanization: "juseu", english: "Juice", swahili: "Juisi" },
    { category: "Drinks", korean: "콜라", romanization: "kolla", english: "Cola", swahili: "Kola" },
    { category: "Drinks", korean: "맥주", romanization: "maekju", english: "Beer", swahili: "Bia" },
    { category: "Drinks", korean: "소주", romanization: "soju", english: "Soju", swahili: "Soju" },
    { category: "Drinks", korean: "물병", romanization: "mulbyeong", english: "Water bottle", swahili: "Chupa ya maji" },
    { category: "Drinks", korean: "음료", romanization: "eumryo", english: "Beverage", swahili: "Kinywaji" },
    { category: "Drinks", korean: "녹차", romanization: "nokcha", english: "Green tea", swahili: "Chai ya kijani" },
    { category: "Drinks", korean: "홍차", romanization: "hongcha", english: "Black tea", swahili: "Chai nyeusi" },
    { category: "Drinks", korean: "레몬차", romanization: "remoncha", english: "Lemon tea", swahili: "Chai ya limau" },
    { category: "Drinks", korean: "아이스커피", romanization: "aiseukeopi", english: "Iced coffee", swahili: "Kahawa ya baridi" },
    { category: "Drinks", korean: "탄산음료", romanization: "tansaneumryo", english: "Soft drink", swahili: "Kinywaji baridi" },


    /* =========================
       11. FOOD — 35
    ========================= */

    { category: "Food", korean: "음식", romanization: "eumsik", english: "Food", swahili: "Chakula" },
    { category: "Food", korean: "밥", romanization: "bap", english: "Rice / meal", swahili: "Mchele / chakula" },
    { category: "Food", korean: "김치", romanization: "gimchi", english: "Kimchi", swahili: "Kimchi" },
    { category: "Food", korean: "고기", romanization: "gogi", english: "Meat", swahili: "Nyama" },
    { category: "Food", korean: "소고기", romanization: "sogogi", english: "Beef", swahili: "Nyama ya ng'ombe" },
    { category: "Food", korean: "돼지고기", romanization: "dwaejigogi", english: "Pork", swahili: "Nyama ya nguruwe" },
    { category: "Food", korean: "닭고기", romanization: "dakgogi", english: "Chicken", swahili: "Kuku" },
    { category: "Food", korean: "생선", romanization: "saengseon", english: "Fish", swahili: "Samaki" },
    { category: "Food", korean: "계란", romanization: "gyeran", english: "Egg", swahili: "Yai" },
    { category: "Food", korean: "빵", romanization: "ppang", english: "Bread", swahili: "Mkate" },
    { category: "Food", korean: "국", romanization: "guk", english: "Soup", swahili: "Supu" },
    { category: "Food", korean: "라면", romanization: "ramyeon", english: "Ramen", swahili: "Rameni" },
    { category: "Food", korean: "국수", romanization: "guksu", english: "Noodles", swahili: "Tambazi / noodles" },
    { category: "Food", korean: "떡", romanization: "tteok", english: "Rice cake", swahili: "Keki ya mchele" },
    { category: "Food", korean: "만두", romanization: "mandu", english: "Dumplings", swahili: "Dumplings" },
    { category: "Food", korean: "김밥", romanization: "gimbap", english: "Gimbap", swahili: "Gimbap" },
    { category: "Food", korean: "불고기", romanization: "bulgogi", english: "Bulgogi", swahili: "Bulgogi" },
    { category: "Food", korean: "비빔밥", romanization: "bibimbap", english: "Bibimbap", swahili: "Bibimbap" },
    { category: "Food", korean: "찌개", romanization: "jjigae", english: "Stew", swahili: "Mchuzi mzito" },
    { category: "Food", korean: "과일", romanization: "gwail", english: "Fruit", swahili: "Matunda" },
    { category: "Food", korean: "사과", romanization: "sagwa", english: "Apple", swahili: "Tofaa" },
    { category: "Food", korean: "바나나", romanization: "banana", english: "Banana", swahili: "Ndizi" },
    { category: "Food", korean: "오렌지", romanization: "orenji", english: "Orange", swahili: "Chungwa" },
    { category: "Food", korean: "포도", romanization: "podo", english: "Grapes", swahili: "Zabibu" },
    { category: "Food", korean: "딸기", romanization: "ttalgi", english: "Strawberry", swahili: "Stroberi" },
    { category: "Food", korean: "수박", romanization: "subak", english: "Watermelon", swahili: "Tikiti maji" },
    { category: "Food", korean: "채소", romanization: "chaeso", english: "Vegetables", swahili: "Mboga" },
    { category: "Food", korean: "감자", romanization: "gamja", english: "Potato", swahili: "Viazi" },
    { category: "Food", korean: "당근", romanization: "danggeun", english: "Carrot", swahili: "Karoti" },
    { category: "Food", korean: "양파", romanization: "yangpa", english: "Onion", swahili: "Kitunguu" },
    { category: "Food", korean: "토마토", romanization: "tomato", english: "Tomato", swahili: "Nyanya" },
    { category: "Food", korean: "소금", romanization: "sogeum", english: "Salt", swahili: "Chumvi" },
    { category: "Food", korean: "설탕", romanization: "seoltang", english: "Sugar", swahili: "Sukari" },
    { category: "Food", korean: "아침식사", romanization: "achimsiksa", english: "Breakfast", swahili: "Kifungua kinywa" },
    { category: "Food", korean: "저녁식사", romanization: "jeonyeoksiksa", english: "Dinner", swahili: "Chakula cha jioni" },


    /* =========================
       12. TRANSPORT & PLACES — 20
    ========================= */

    { category: "Transport & Places", korean: "자동차", romanization: "jadongcha", english: "Car", swahili: "Gari" },
    { category: "Transport & Places", korean: "버스", romanization: "beoseu", english: "Bus", swahili: "Basi" },
    { category: "Transport & Places", korean: "택시", romanization: "taeksi", english: "Taxi", swahili: "Teksi" },
    { category: "Transport & Places", korean: "기차", romanization: "gicha", english: "Train", swahili: "Treni" },
    { category: "Transport & Places", korean: "지하철", romanization: "jihacheol", english: "Subway", swahili: "Treni ya chini ya ardhi" },
    { category: "Transport & Places", korean: "비행기", romanization: "bihaenggi", english: "Airplane", swahili: "Ndege" },
    { category: "Transport & Places", korean: "배", romanization: "bae", english: "Ship / boat", swahili: "Meli / mashua" },
    { category: "Transport & Places", korean: "자전거", romanization: "jajeongeo", english: "Bicycle", swahili: "Baiskeli" },
    { category: "Transport & Places", korean: "공항", romanization: "gonghang", english: "Airport", swahili: "Uwanja wa ndege" },
    { category: "Transport & Places", korean: "역", romanization: "yeok", english: "Station", swahili: "Kituo" },
    { category: "Transport & Places", korean: "버스 정류장", romanization: "beoseu jeongnyujang", english: "Bus stop", swahili: "Kituo cha basi" },
    { category: "Transport & Places", korean: "호텔", romanization: "hotel", english: "Hotel", swahili: "Hoteli" },
    { category: "Transport & Places", korean: "식당", romanization: "sikdang", english: "Restaurant", swahili: "Mgahawa" },
    { category: "Transport & Places", korean: "시장", romanization: "sijang", english: "Market", swahili: "Soko" },
    { category: "Transport & Places", korean: "은행", romanization: "eunhaeng", english: "Bank", swahili: "Benki" },
    { category: "Transport & Places", korean: "병원", romanization: "byeongwon", english: "Hospital", swahili: "Hospitali" },
    { category: "Transport & Places", korean: "약국", romanization: "yakguk", english: "Pharmacy", swahili: "Duka la dawa" },
    { category: "Transport & Places", korean: "공원", romanization: "gongwon", english: "Park", swahili: "Bustani / hifadhi" },
    { category: "Transport & Places", korean: "도시", romanization: "dosi", english: "City", swahili: "Jiji" },
    { category: "Transport & Places", korean: "나라", romanization: "nara", english: "Country", swahili: "Nchi" },


    /* =========================
       13. FEELINGS & COMMON WORDS — 36
    ========================= */

    { category: "Feelings & Common Words", korean: "행복", romanization: "haengbok", english: "Happiness", swahili: "Furaha" },
    { category: "Feelings & Common Words", korean: "기쁨", romanization: "gippeum", english: "Joy", swahili: "Shangwe" },
    { category: "Feelings & Common Words", korean: "사랑", romanization: "sarang", english: "Love", swahili: "Upendo" },
    { category: "Feelings & Common Words", korean: "슬픔", romanization: "seulpeum", english: "Sadness", swahili: "Huzuni" },
    { category: "Feelings & Common Words", korean: "화", romanization: "hwa", english: "Anger", swahili: "Hasira" },
    { category: "Feelings & Common Words", korean: "두려움", romanization: "duryeoum", english: "Fear", swahili: "Hofu" },
    { category: "Feelings & Common Words", korean: "걱정", romanization: "geokjeong", english: "Worry", swahili: "Wasiwasi" },
    { category: "Feelings & Common Words", korean: "피곤하다", romanization: "pigonhada", english: "To be tired", swahili: "Kuchoka" },
    { category: "Feelings & Common Words", korean: "좋다", romanization: "jota", english: "To be good / like", swahili: "Kuwa nzuri / kupenda" },
    { category: "Feelings & Common Words", korean: "싫다", romanization: "silta", english: "To dislike", swahili: "Kutopenda" },
    { category: "Feelings & Common Words", korean: "예쁘다", romanization: "yeppeuda", english: "Pretty", swahili: "Mzuri / mrembo" },
    { category: "Feelings & Common Words", korean: "멋있다", romanization: "meositda", english: "Cool / stylish", swahili: "Mwenye kuvutia" },
    { category: "Feelings & Common Words", korean: "맛있다", romanization: "masitda", english: "Delicious", swahili: "Kitamu" },
    { category: "Feelings & Common Words", korean: "재미있다", romanization: "jaemiitda", english: "Interesting / fun", swahili: "Kuvutia / kufurahisha" },
    { category: "Feelings & Common Words", korean: "쉽다", romanization: "swipda", english: "Easy", swahili: "Rahisi" },
    { category: "Feelings & Common Words", korean: "어렵다", romanization: "eoryeopda", english: "Difficult", swahili: "Ngumu" },
    { category: "Feelings & Common Words", korean: "크다", romanization: "keuda", english: "Big", swahili: "Kubwa" },
    { category: "Feelings & Common Words", korean: "작다", romanization: "jakda", english: "Small", swahili: "Ndogo" },
    { category: "Feelings & Common Words", korean: "많다", romanization: "manta", english: "Many / much", swahili: "Nyingi" },
    { category: "Feelings & Common Words", korean: "적다", romanization: "jeokda", english: "Few / little", swahili: "Chache" },
    { category: "Feelings & Common Words", korean: "빠르다", romanization: "ppareuda", english: "Fast", swahili: "Haraka" },
    { category: "Feelings & Common Words", korean: "느리다", romanization: "neurida", english: "Slow", swahili: "Polepole" },
    { category: "Feelings & Common Words", korean: "좋아요", romanization: "joayo", english: "It's good / I like it", swahili: "Ni nzuri / napenda" },
    { category: "Feelings & Common Words", korean: "네", romanization: "ne", english: "Yes", swahili: "Ndiyo" },
    { category: "Feelings & Common Words", korean: "아니요", romanization: "aniyo", english: "No", swahili: "Hapana" },
    { category: "Feelings & Common Words", korean: "감사합니다", romanization: "gamsahamnida", english: "Thank you", swahili: "Asante" },
    { category: "Feelings & Common Words", korean: "미안합니다", romanization: "mianhamnida", english: "I'm sorry", swahili: "Samahani" },
    { category: "Feelings & Common Words", korean: "괜찮아요", romanization: "gwaenchanayo", english: "It's okay", swahili: "Ni sawa" },
    { category: "Feelings & Common Words", korean: "안녕하세요", romanization: "annyeonghaseyo", english: "Hello", swahili: "Habari" },
    { category: "Feelings & Common Words", korean: "안녕히 가세요", romanization: "annyeonghi gaseyo", english: "Goodbye", swahili: "Kwa heri" },
    { category: "Feelings & Common Words", korean: "주세요", romanization: "juseyo", english: "Please give me", swahili: "Tafadhali nipe" },
    { category: "Feelings & Common Words", korean: "왜", romanization: "wae", english: "Why", swahili: "Kwa nini" },
    { category: "Feelings & Common Words", korean: "무엇", romanization: "mueot", english: "What", swahili: "Nini" },
    { category: "Feelings & Common Words", korean: "어디", romanization: "eodi", english: "Where", swahili: "Wapi" },
    { category: "Feelings & Common Words", korean: "누구", romanization: "nugu", english: "Who", swahili: "Nani" },
    { category: "Feelings & Common Words", korean: "어떻게", romanization: "eotteoke", english: "How", swahili: "Vipi" }

];


/* =========================================
   CHECK VOCABULARY COUNT
========================================= */

console.log(
    "Vocabulary loaded:",
    vocabulary.length,
    "words"
);
``````javascript id="v1n8kp"
/* =========================================
   VOCABULARY DISPLAY
========================================= */

const vocabularyList = document.getElementById("vocabulary-list");
const vocabularySearch = document.getElementById("vocabularySearch");
const categoryFilter = document.getElementById("categoryFilter");
const vocabularyCount = document.getElementById("vocabularyCount");
const vocabularyEmpty = document.getElementById("vocabularyEmpty");


function displayVocabulary() {

    if (!vocabularyList) return;

    const searchText =
        vocabularySearch
            ? vocabularySearch.value.toLowerCase().trim()
            : "";

    const selectedCategory =
        categoryFilter
            ? categoryFilter.value
            : "all";


    const filteredWords = vocabulary.filter(function (word) {

        const matchesCategory =
            selectedCategory === "all" ||
            word.category === selectedCategory;


        const matchesSearch =
            word.korean.toLowerCase().includes(searchText) ||
            word.romanization.toLowerCase().includes(searchText) ||
            word.english.toLowerCase().includes(searchText) ||
            word.swahili.toLowerCase().includes(searchText);


        return matchesCategory && matchesSearch;

    });


    vocabularyList.innerHTML = "";


    /* =========================
       NO RESULTS
    ========================= */

    if (filteredWords.length === 0) {

        if (vocabularyEmpty) {
            vocabularyEmpty.style.display = "block";
        }

        if (vocabularyCount) {
            vocabularyCount.textContent = "No words found";
        }

        return;

    }


    if (vocabularyEmpty) {
        vocabularyEmpty.style.display = "none";
    }


    /* =========================
       UPDATE COUNT
    ========================= */

    if (vocabularyCount) {

        vocabularyCount.textContent =
            `Showing ${filteredWords.length} word${filteredWords.length === 1 ? "" : "s"}`;

    }


    /* =========================
       CREATE WORD CARDS
    ========================= */

    filteredWords.forEach(function (word) {

        const card = document.createElement("div");

        card.className = "vocabulary-card";


        card.innerHTML = `

            <div class="vocabulary-card-top">

                <span class="vocabulary-category">
                    ${word.category}
                </span>

                <button
                    class="vocabulary-speak"
                    type="button"
                    data-korean="${word.korean}"
                    aria-label="Pronounce ${word.korean}"
                >
                    🔊
                </button>

            </div>


            <div class="vocabulary-korean">
                ${word.korean}
            </div>


            <div class="vocabulary-romanization">
                ${word.romanization}
            </div>


            <div class="vocabulary-meaning">

                <strong>
                    ${word.english}
                </strong>

                <span>
                    ${word.swahili}
                </span>

            </div>

        `;


        vocabularyList.appendChild(card);


        /* =========================
           PRONUNCIATION BUTTON
        ========================= */

        const speakButton =
            card.querySelector(".vocabulary-speak");


        speakButton.addEventListener("click", function () {

            speak(word.korean);

        });

    });

}


/* =========================================
   SEARCH
========================================= */

if (vocabularySearch) {

    vocabularySearch.addEventListener(
        "input",
        displayVocabulary
    );

}


/* =========================================
   CATEGORY FILTER
========================================= */

if (categoryFilter) {

    categoryFilter.addEventListener(
        "change",
        displayVocabulary
    );

}


/* =========================================
   INITIAL DISPLAY
========================================= */

displayVocabulary();
```


