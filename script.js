// ========================================
// JIFUNZE KIKOREA - MAIN JAVASCRIPT
// ========================================


// ========================================
// MOBILE MENU
// ========================================

const menu = document.getElementById("menu");
const links = document.getElementById("links");

if (menu && links) {

    menu.addEventListener("click", () => {
        links.classList.toggle("open");
    });

    document.querySelectorAll(".links a").forEach(link => {

        link.addEventListener("click", () => {
            links.classList.remove("open");
        });

    });

}


// ========================================
// KOREAN PRONUNCIATION
// ========================================

function speak(text) {

    if ("speechSynthesis" in window) {

        const utterance = new SpeechSynthesisUtterance(text);

        utterance.lang = "ko-KR";

        utterance.rate = 0.85;

        speechSynthesis.cancel();

        speechSynthesis.speak(utterance);

    } else {

        alert("Your browser does not support Korean pronunciation.");

    }

}


// ========================================
// VOCABULARY DATA
// ========================================

const vocabulary = [

    // =========================
    // COLOURS
    // =========================

    {
        korean: "빨간색",
        romanization: "Ppalgansaek",
        english: "Red",
        swahili: "Nyekundu",
        category: "Colours"
    },

    {
        korean: "파란색",
        romanization: "Paransaek",
        english: "Blue",
        swahili: "Bluu",
        category: "Colours"
    },

    {
        korean: "노란색",
        romanization: "Noransaek",
        english: "Yellow",
        swahili: "Njano",
        category: "Colours"
    },

    {
        korean: "초록색",
        romanization: "Choroksaek",
        english: "Green",
        swahili: "Kijani",
        category: "Colours"
    },

    {
        korean: "검은색",
        romanization: "Geomeunsaek",
        english: "Black",
        swahili: "Jeusi",
        category: "Colours"
    },

    {
        korean: "흰색",
        romanization: "Huinsaek",
        english: "White",
        swahili: "Nyeupe",
        category: "Colours"
    },

    {
        korean: "분홍색",
        romanization: "Bunhongsaek",
        english: "Pink",
        swahili: "Waridi",
        category: "Colours"
    },

    {
        korean: "보라색",
        romanization: "Borasaek",
        english: "Purple",
        swahili: "Zambarau",
        category: "Colours"
    },

    {
        korean: "주황색",
        romanization: "Juhwangsaek",
        english: "Orange",
        swahili: "Machungwa",
        category: "Colours"
    },

    {
        korean: "갈색",
        romanization: "Galsaek",
        english: "Brown",
        swahili: "Kahawia",
        category: "Colours"
    },


    // =========================
    // DAYS
    // =========================

    {
        korean: "월요일",
        romanization: "Woryoil",
        english: "Monday",
        swahili: "Jumatatu",
        category: "Days"
    },

    {
        korean: "화요일",
        romanization: "Hwayoil",
        english: "Tuesday",
        swahili: "Jumanne",
        category: "Days"
    },

    {
        korean: "수요일",
        romanization: "Suyoil",
        english: "Wednesday",
        swahili: "Jumatano",
        category: "Days"
    },

    {
        korean: "목요일",
        romanization: "Mogyoil",
        english: "Thursday",
        swahili: "Alhamisi",
        category: "Days"
    },

    {
        korean: "금요일",
        romanization: "Geumyoil",
        english: "Friday",
        swahili: "Ijumaa",
        category: "Days"
    },

    {
        korean: "토요일",
        romanization: "Toyoil",
        english: "Saturday",
        swahili: "Jumamosi",
        category: "Days"
    },

    {
        korean: "일요일",
        romanization: "Iryoil",
        english: "Sunday",
        swahili: "Jumapili",
        category: "Days"
    },


    // =========================
    // FAMILY
    // =========================

    {
        korean: "가족",
        romanization: "Gajok",
        english: "Family",
        swahili: "Familia",
        category: "Family"
    },

    {
        korean: "어머니",
        romanization: "Eomeoni",
        english: "Mother",
        swahili: "Mama",
        category: "Family"
    },

    {
        korean: "아버지",
        romanization: "Abeoji",
        english: "Father",
        swahili: "Baba",
        category: "Family"
    },

    {
        korean: "부모님",
        romanization: "Bumonim",
        english: "Parents",
        swahili: "Wazazi",
        category: "Family"
    },

    {
        korean: "형",
        romanization: "Hyeong",
        english: "Older brother",
        swahili: "Kaka mkubwa",
        category: "Family"
    },

    {
        korean: "오빠",
        romanization: "Oppa",
        english: "Older brother",
        swahili: "Kaka mkubwa",
        category: "Family"
    },

    {
        korean: "누나",
        romanization: "Nuna",
        english: "Older sister",
        swahili: "Dada mkubwa",
        category: "Family"
    },

    {
        korean: "언니",
        romanization: "Eonni",
        english: "Older sister",
        swahili: "Dada mkubwa",
        category: "Family"
    },

    {
        korean: "동생",
        romanization: "Dongsaeng",
        english: "Younger sibling",
        swahili: "Kaka/dada mdogo",
        category: "Family"
    },

    {
        korean: "할아버지",
        romanization: "Harabeoji",
        english: "Grandfather",
        swahili: "Babu",
        category: "Family"
    },

    {
        korean: "할머니",
        romanization: "Halmeoni",
        english: "Grandmother",
        swahili: "Bibi",
        category: "Family"
    },


    // =========================
    // TIME
    // =========================

    {
        korean: "오늘",
        romanization: "Oneul",
        english: "Today",
        swahili: "Leo",
        category: "Time"
    },

    {
        korean: "내일",
        romanization: "Naeil",
        english: "Tomorrow",
        swahili: "Kesho",
        category: "Time"
    },

    {
        korean: "어제",
        romanization: "Eoje",
        english: "Yesterday",
        swahili: "Jana",
        category: "Time"
    },

    {
        korean: "지금",
        romanization: "Jigeum",
        english: "Now",
        swahili: "Sasa",
        category: "Time"
    },

    {
        korean: "아침",
        romanization: "Achim",
        english: "Morning",
        swahili: "Asubuhi",
        category: "Time"
    },

    {
        korean: "오후",
        romanization: "Ohu",
        english: "Afternoon",
        swahili: "Mchana",
        category: "Time"
    },

    {
        korean: "저녁",
        romanization: "Jeonyeok",
        english: "Evening",
        swahili: "Jioni",
        category: "Time"
    },

    {
        korean: "밤",
        romanization: "Bam",
        english: "Night",
        swahili: "Usiku",
        category: "Time"
    },

    {
        korean: "시간",
        romanization: "Sigan",
        english: "Time",
        swahili: "Muda",
        category: "Time"
    },


    // =========================
    // HOUSE
    // =========================

    {
        korean: "집",
        romanization: "Jip",
        english: "House / Home",
        swahili: "Nyumba",
        category: "House"
    },

    {
        korean: "방",
        romanization: "Bang",
        english: "Room",
        swahili: "Chumba",
        category: "House"
    },

    {
        korean: "거실",
        romanization: "Geosil",
        english: "Living room",
        swahili: "Sebule",
        category: "House"
    },

    {
        korean: "부엌",
        romanization: "Bueok",
        english: "Kitchen",
        swahili: "Jikoni",
        category: "House"
    },

    {
        korean: "화장실",
        romanization: "Hwajangsil",
        english: "Bathroom",
        swahili: "Bafu",
        category: "House"
    },

    {
        korean: "문",
        romanization: "Mun",
        english: "Door",
        swahili: "Mlango",
        category: "House"
    },

    {
        korean: "창문",
        romanization: "Changmun",
        english: "Window",
        swahili: "Dirisha",
        category: "House"
    },

    {
        korean: "침대",
        romanization: "Chimdae",
        english: "Bed",
        swahili: "Kitanda",
        category: "House"
    },

    {
        korean: "의자",
        romanization: "Uija",
        english: "Chair",
        swahili: "Kiti",
        category: "House"
    },

    {
        korean: "책상",
        romanization: "Chaeksang",
        english: "Desk",
        swahili: "Dawati",
        category: "House"
    },


    // =========================
    // SCHOOL
    // =========================

    {
        korean: "학교",
        romanization: "Hakgyo",
        english: "School",
        swahili: "Shule",
        category: "School"
    },

    {
        korean: "학생",
        romanization: "Haksaeng",
        english: "Student",
        swahili: "Mwanafunzi",
        category: "School"
    },

    {
        korean: "선생님",
        romanization: "Seonsaengnim",
        english: "Teacher",
        swahili: "Mwalimu",
        category: "School"
    },

    {
        korean: "교실",
        romanization: "Gyosil",
        english: "Classroom",
        swahili: "Darasa",
        category: "School"
    },

    {
        korean: "책",
        romanization: "Chaek",
        english: "Book",
        swahili: "Kitabu",
        category: "School"
    },

    {
        korean: "공책",
        romanization: "Gongchaek",
        english: "Notebook",
        swahili: "Daftari",
        category: "School"
    },

    {
        korean: "연필",
        romanization: "Yeonpil",
        english: "Pencil",
        swahili: "Penseli",
        category: "School"
    },

    {
        korean: "펜",
        romanization: "Pen",
        english: "Pen",
        swahili: "Kalamu",
        category: "School"
    },

    {
        korean: "시험",
        romanization: "Siheom",
        english: "Exam",
        swahili: "Mtihani",
        category: "School"
    },

    {
        korean: "숙제",
        romanization: "Sukje",
        english: "Homework",
        swahili: "Kazi ya nyumbani",
        category: "School"
    },


    // =========================
    // UNIVERSITY
    // =========================

    {
        korean: "대학교",
        romanization: "Daehakgyo",
        english: "University",
        swahili: "Chuo kikuu",
        category: "University"
    },

    {
        korean: "대학생",
        romanization: "Daehaksaeng",
        english: "University student",
        swahili: "Mwanafunzi wa chuo",
        category: "University"
    },

    {
        korean: "교수",
        romanization: "Gyosu",
        english: "Professor",
        swahili: "Profesa",
        category: "University"
    },

    {
        korean: "학과",
        romanization: "Hakkwa",
        english: "Department",
        swahili: "Idara",
        category: "University"
    },

    {
        korean: "전공",
        romanization: "Jeongong",
        english: "Major",
        swahili: "Masomo makuu",
        category: "University"
    },

    {
        korean: "강의",
        romanization: "Gangui",
        english: "Lecture",
        swahili: "Mhadhara",
        category: "University"
    },

    {
        korean: "과제",
        romanization: "Gwaje",
        english: "Assignment",
        swahili: "Kazi ya chuo",
        category: "University"
    },

    {
        korean: "졸업",
        romanization: "Joreop",
        english: "Graduation",
        swahili: "Mahafali",
        category: "University"
    },


    // =========================
    // OFFICE
    // =========================

    {
        korean: "회사",
        romanization: "Hoesa",
        english: "Company",
        swahili: "Kampuni",
        category: "Office"
    },

    {
        korean: "사무실",
        romanization: "Samusil",
        english: "Office",
        swahili: "Ofisi",
        category: "Office"
    },

    {
        korean: "직원",
        romanization: "Jigwon",
        english: "Employee",
        swahili: "Mfanyakazi",
        category: "Office"
    },

    {
        korean: "사장님",
        romanization: "Sajangnim",
        english: "Boss",
        swahili: "Bosi",
        category: "Office"
    },

    {
        korean: "동료",
        romanization: "Dongnyo",
        english: "Colleague",
        swahili: "Mwenzako kazini",
        category: "Office"
    },

    {
        korean: "회의",
        romanization: "Hoeui",
        english: "Meeting",
        swahili: "Mkutano",
        category: "Office"
    },

    {
        korean: "컴퓨터",
        romanization: "Keompyuteo",
        english: "Computer",
        swahili: "Kompyuta",
        category: "Office"
    },

    {
        korean: "이메일",
        romanization: "Imeil",
        english: "Email",
        swahili: "Barua pepe",
        category: "Office"
    },


    // =========================
    // DRINKS
    // =========================

    {
        korean: "물",
        romanization: "Mul",
        english: "Water",
        swahili: "Maji",
        category: "Drinks"
    },

    {
        korean: "커피",
        romanization: "Keopi",
        english: "Coffee",
        swahili: "Kahawa",
        category: "Drinks"
    },

    {
        korean: "차",
        romanization: "Cha",
        english: "Tea",
        swahili: "Chai",
        category: "Drinks"
    },

    {
        korean: "우유",
        romanization: "Uyu",
        english: "Milk",
        swahili: "Maziwa",
        category: "Drinks"
    },

    {
        korean: "주스",
        romanization: "Juseu",
        english: "Juice",
        swahili: "Juisi",
        category: "Drinks"
    },

    {
        korean: "콜라",
        romanization: "Kolla",
        english: "Cola",
        swahili: "Cola",
        category: "Drinks"
    },


    // =========================
    // FOOD
    // =========================

    {
        korean: "음식",
        romanization: "Eumsik",
        english: "Food",
        swahili: "Chakula",
        category: "Food"
    },

    {
        korean: "밥",
        romanization: "Bap",
        english: "Rice / Meal",
        swahili: "Mchele / Chakula",
        category: "Food"
    },

    {
        korean: "빵",
        romanization: "Ppang",
        english: "Bread",
        swahili: "Mkate",
        category: "Food"
    },

    {
        korean: "고기",
        romanization: "Gogi",
        english: "Meat",
        swahili: "Nyama",
        category: "Food"
    },

    {
        korean: "소고기",
        romanization: "Sogogi",
        english: "Beef",
        swahili: "Nyama ya ng'ombe",
        category: "Food"
    },

    {
        korean: "닭고기",
        romanization: "Dakgogi",
        english: "Chicken",
        swahili: "Kuku",
        category: "Food"
    },

    {
        korean: "생선",
        romanization: "Saengseon",
        english: "Fish",
        swahili: "Samaki",
        category: "Food"
    },

    {
        korean: "계란",
        romanization: "Gyeran",
        english: "Egg",
        swahili: "Yai",
        category: "Food"
    },

    {
        korean: "김치",
        romanization: "Gimchi",
        english: "Kimchi",
        swahili: "Kimchi",
        category: "Food"
    },

    {
        korean: "국",
        romanization: "Guk",
        english: "Soup",
        swahili: "Supu",
        category: "Food"
    },

    {
        korean: "라면",
        romanization: "Ramyeon",
        english: "Ramen",
        swahili: "Rameni",
        category: "Food"
    },

    {
        korean: "과일",
        romanization: "Gwail",
        english: "Fruit",
        swahili: "Tunda",
        category: "Food"
    },

    {
        korean: "사과",
        romanization: "Sagwa",
        english: "Apple",
        swahili: "Tofaa",
        category: "Food"
    },

    {
        korean: "바나나",
        romanization: "Banana",
        english: "Banana",
        swahili: "Ndizi",
        category: "Food"
    },

    {
        korean: "딸기",
        romanization: "Ttalgi",
        english: "Strawberry",
        swahili: "Stroberi",
        category: "Food"
    },

    {
        korean: "감자",
        romanization: "Gamja",
        english: "Potato",
        swahili: "Viazi",
        category: "Food"
    },

    {
        korean: "당근",
        romanization: "Danggeun",
        english: "Carrot",
        swahili: "Karoti",
        category: "Food"
    },

    {
        korean: "양파",
        romanization: "Yangpa",
        english: "Onion",
        swahili: "Kitunguu",
        category: "Food"
    }

];


// ========================================
// VOCABULARY COUNT
// ========================================

console.log(
    "JifunzeKikorea vocabulary loaded:",
    vocabulary.length
);


// ========================================
// QUIZ DATA
// ========================================

const quizQuestions = [

    {
        question: "What does 어머니 mean?",
        options: [
            "Father",
            "Mother",
            "Sister",
            "Friend"
        ],
        answer: "Mother"
    },

    {
        question: "What does 학교 mean?",
        options: [
            "Hospital",
            "House",
            "School",
            "Office"
        ],
        answer: "School"
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
        question: "What does 빨간색 mean?",
        options: [
            "Blue",
            "Green",
            "Red",
            "Yellow"
        ],
        answer: "Red"
    },

    {
        question: "What does 친구 mean?",
        options: [
            "Teacher",
            "Friend",
            "Student",
            "Father"
        ],
        answer: "Friend"
    },

    {
        question: "What does 월요일 mean?",
        options: [
            "Monday",
            "Tuesday",
            "Friday",
            "Sunday"
        ],
        answer: "Monday"
    },

    {
        question: "What does 가족 mean?",
        options: [
            "School",
            "Family",
            "House",
            "Food"
        ],
        answer: "Family"
    },

    {
        question: "What does 책 mean?",
        options: [
            "Book",
            "Pen",
            "Desk",
            "Chair"
        ],
        answer: "Book"
    },

    {
        question: "What does 커피 mean?",
        options: [
            "Tea",
            "Water",
            "Coffee",
            "Juice"
        ],
        answer: "Coffee"
    },

    {
        question: "What does 사과 mean?",
        options: [
            "Apple",
            "Banana",
            "Fish",
            "Bread"
        ],
        answer: "Apple"
    }

];


// ========================================
// QUIZ SYSTEM
// ========================================

let currentQuestion = 0;
let score = 0;

const quizBox = document.querySelector(".quiz");

function showQuestion() {

    if (!quizBox) return;

    const question = quizQuestions[currentQuestion];

    quizBox.innerHTML = "";

    const title = document.createElement("h3");

    title.textContent =
        `Question ${currentQuestion + 1} of ${quizQuestions.length}: ${question.question}`;

    quizBox.appendChild(title);


    question.options.forEach(option => {

        const button = document.createElement("button");

        button.className = "answer";

        button.textContent = option;

        button.addEventListener("click", () => {

            if (option === question.answer) {

                score++;

                button.textContent =
                    "✅ " + option;

                button.style.color = "#16803c";

            } else {

                button.textContent =
                    "❌ " + option;

                button.style.color = "#d32f2f";

            }


            const buttons =
                quizBox.querySelectorAll(".answer");

            buttons.forEach(btn => {

                btn.disabled = true;

            });


            setTimeout(() => {

                currentQuestion++;

                if (currentQuestion < quizQuestions.length) {

                    showQuestion();

                } else {

                    showQuizResult();

                }

            }, 800);

        });

        quizBox.appendChild(button);

    });

}


function showQuizResult() {

    quizBox.innerHTML = "";

    const title = document.createElement("h2");

    title.textContent = "🎉 Quiz Complete!";

    quizBox.appendChild(title);


    const result = document.createElement("p");

    const percentage =
        Math.round((score / quizQuestions.length) * 100);

    result.textContent =
        `You scored ${score}/${quizQuestions.length} (${percentage}%).`;

    quizBox.appendChild(result);


    const restart = document.createElement("button");

    restart.className = "btn pink";

    restart.textContent = "Try Again";

    restart.addEventListener("click", () => {

        currentQuestion = 0;

        score = 0;

        showQuestion();

    });

    quizBox.appendChild(restart);

}


// Start quiz

showQuestion();

