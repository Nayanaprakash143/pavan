const quizData = JSON.parse(localStorage.getItem("quizData")) || [];
let currentQuestionIndex = 0;
let score = 0;

// DOM Elements
const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const nextBtn = document.getElementById("next-btn");
const resultEl = document.getElementById("result");
const scoreEl = document.getElementById("score");

// Load a question
function loadQuestion() {
  const currentQuestion = quizData[currentQuestionIndex];
  questionEl.textContent = currentQuestion.question;
  choicesEl.innerHTML = "";

  currentQuestion.choices.forEach((choice, index) => {
    const button = document.createElement("button");
    button.textContent = choice;
    button.onclick = () => selectAnswer(index);
    choicesEl.appendChild(button);
  });
}

// Handle answer selection
function selectAnswer(selectedIndex) {
  const correctIndex = quizData[currentQuestionIndex].correct;
  if (selectedIndex === correctIndex) {
    score++;
  }
  nextBtn.disabled = false;
}

// Move to the next question
function nextQuestion() {
  currentQuestionIndex++;
  nextBtn.disabled = true;

  if (currentQuestionIndex < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

// Display the final result
function showResult() {
  document.getElementById("quiz").style.display = "none";
  resultEl.style.display = "block";
  scoreEl.textContent = `${score} / ${quizData.length}`;
}

// Restart the quiz
function restartQuiz() {
  score = 0;
  currentQuestionIndex = 0;
  document.getElementById("quiz").style.display = "block";
  resultEl.style.display = "none";
  loadQuestion();
}

// Initialize the quiz
if (quizData.length > 0) {
  loadQuestion();
  nextBtn.disabled = true;
} else {
  questionEl.textContent = "No questions available!";
  nextBtn.style.display = "none";
}
