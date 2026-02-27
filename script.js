// ADMIN CONTROLLED QUESTIONS
const quizData = [
    {
        question: "In which year was the college established?",
        options: ["1995", "2001", "1987", "2010"],
        answer: 2,
        explanation: "The college was established in 1987."
    },
    {
        question: "Which department offers B.Tech in Computer Science?",
        options: ["Mechanical", "Civil", "CSE", "Electrical"],
        answer: 2,
        explanation: "CSE department offers B.Tech in Computer Science."
    },
    {
        question: "Which course focuses on database systems?",
        options: ["DBMS", "Operating Systems", "Networks", "AI"],
        answer: 0,
        explanation: "DBMS deals with database systems."
    },
    {
        question: "Which language is mainly used in web development?",
        options: ["C", "JavaScript", "Assembly", "Fortran"],
        answer: 1,
        explanation: "JavaScript is widely used in web development."
    },
    {
        question: "Which subject includes stack and queue?",
        options: ["DSA", "Maths", "Physics", "Chemistry"],
        answer: 0,
        explanation: "DSA includes stack and queue concepts."
    },
    {
        question: "Who is the current principal?",
        options: ["Dr. A", "Dr. B", "Dr. C", "Dr. D"],
        answer: 0,
        explanation: "Dr. A is the current principal."
    },
    {
        question: "Which course teaches networking?",
        options: ["CN", "AI", "ML", "DBMS"],
        answer: 0,
        explanation: "CN stands for Computer Networks."
    },
    {
        question: "Which lab is used for programming practice?",
        options: ["Physics Lab", "Chem Lab", "Computer Lab", "Workshop"],
        answer: 2,
        explanation: "Programming is done in Computer Lab."
    },
    {
        question: "Which event is technical fest?",
        options: ["Sports Day", "Cultural Fest", "TechFest", "Annual Day"],
        answer: 2,
        explanation: "TechFest is the technical event."
    },
    {
        question: "Which course includes machine learning?",
        options: ["AI", "DSA", "OS", "DBMS"],
        answer: 0,
        explanation: "AI includes machine learning."
    }
];

let currentQuestion = 0;
let score = 0;
let selectedOption = null;
let timer;
let timeLeft = 15;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const feedbackEl = document.getElementById("feedback");
const submitBtn = document.getElementById("submit-btn");
const progressEl = document.getElementById("progress");
const resultSection = document.getElementById("result-section");
const scoreEl = document.getElementById("score");
const timerEl = document.getElementById("time");

// Shuffle questions (Randomization)
quizData.sort(() => Math.random() - 0.5);

function loadQuestion() {
    resetState();
    let q = quizData[currentQuestion];
    questionEl.textContent = q.question;

    q.options.forEach((option, index) => {
        const btn = document.createElement("button");
        btn.textContent = option;
        btn.setAttribute("role", "radio");
        btn.onclick = () => selectOption(btn, index);
        optionsEl.appendChild(btn);
    });

    updateProgress();
    startTimer();
}

function selectOption(button, index) {
    selectedOption = index;
    Array.from(optionsEl.children).forEach(btn => btn.classList.remove("selected"));
    button.classList.add("selected");
}

function checkAnswer() {
    if (selectedOption === null) {
        alert("Please select an option!");
        return;
    }

    const correct = quizData[currentQuestion].answer;
    feedbackEl.classList.add("show-feedback");

    if (selectedOption === correct) {
        score++;
        feedbackEl.textContent = "Correct! 🎉";
        feedbackEl.style.color = "green";
    } else {
        feedbackEl.textContent = "Incorrect! " + quizData[currentQuestion].explanation;
        feedbackEl.style.color = "red";
    }

    clearInterval(timer);

    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < quizData.length) {
            loadQuestion();
        } else {
            showResult();
        }
    }, 2000);
}

function updateProgress() {
    let progressPercent = ((currentQuestion) / quizData.length) * 100;
    progressEl.style.width = progressPercent + "%";
}

function showResult() {
    document.getElementById("quiz-container").classList.add("hidden");
    resultSection.classList.remove("hidden");
    scoreEl.textContent = `You scored ${score} out of ${quizData.length}`;
}

function restartQuiz() {
    location.reload();
}

function resetState() {
    optionsEl.innerHTML = "";
    feedbackEl.textContent = "";
    feedbackEl.classList.remove("show-feedback");
    selectedOption = null;
    timeLeft = 15;
    timerEl.textContent = timeLeft;
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerEl.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            checkAnswer();
        }
    }, 1000);
}

submitBtn.addEventListener("click", checkAnswer);

loadQuestion();