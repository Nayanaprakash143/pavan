const quizData = [
    {
      question: "What is the capital of France?",
      options: ["Paris", "London", "Berlin", "Madrid"],
      answer: "Paris",
    },
    {
      question: "Which language runs in a web browser?",
      options: ["Python", "JavaScript", "C++", "Java"],
      answer: "JavaScript",
    },
    {
      question: "What does HTML stand for?",
      options: [
        "Hypertext Markup Language",
        "Hyperloop Machine Language",
        "Hyper Markup Language",
        "Hightext Machine Language",
      ],
      answer: "Hypertext Markup Language",
    },
    {
      question: "Who developed the theory of relativity?",
      options: ["Newton", "Einstein", "Tesla", "Edison"],
      answer: "Einstein",
    },
  ];
  
  const quizContainer = document.getElementById("quiz");
  const submitBtn = document.getElementById("submit");
  const resultContainer = document.getElementById("result");
  const scoreDisplay = document.getElementById("score");
  const restartBtn = document.getElementById("restart");
  
  let currentQuiz = 0;
  let score = 0;
  
  // Load a question
  function loadQuiz() {
    const currentData = quizData[currentQuiz];
    quizContainer.innerHTML = `
      <div class="question">${currentData.question}</div>
      <ul class="options">
        ${currentData.options
          .map(
            (option, index) =>
              `<li>
                <label>
                  <input type="radio" name="option" value="${option}">
                  ${option}
                </label>
              </li>`
          )
          .join("")}
      </ul>
    `;
  }
  
  // Check the selected answer
  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (!selectedOption) return alert("Please select an answer!");
    
    const answer = selectedOption.value;
    if (answer === quizData[currentQuiz].answer) score++;
  
    currentQuiz++;
    if (currentQuiz < quizData.length) {
      loadQuiz();
    } else {
      showResult();
    }
  }
  
  // Show the final score
  function showResult() {
    quizContainer.classList.add("hidden");
    submitBtn.classList.add("hidden");
    resultContainer.classList.remove("hidden");
    scoreDisplay.textContent = `${score} / ${quizData.length}`;
  }
  
  // Restart the quiz
  function restartQuiz() {
    currentQuiz = 0;
    score = 0;
    quizContainer.classList.remove("hidden");
    submitBtn.classList.remove("hidden");
    resultContainer.classList.add("hidden");
    loadQuiz();
  }
  
  // Event listeners
  submitBtn.addEventListener("click", checkAnswer);
  
  
  // Initialize the quiz
  loadQuiz();
  function saveUserScore() {
    const usernameInput = document.getElementById("username");
    const username = usernameInput ? usernameInput.value.trim() : "";
  
    if (!username) {
      alert("Please enter your name.");
      return;
    }
  
    const userScores = JSON.parse(localStorage.getItem("userScores")) || [];
    userScores.push({ username, score });
    localStorage.setItem("userScores", JSON.stringify(userScores));
  
    alert("Your score has been saved!");
    location.reload(); // Restart the quiz
  }
  
  // Display scores in admin panel
  function displayUserScores() {
    const userScores = JSON.parse(localStorage.getItem("userScores")) || [];
    const tbody = document.querySelector("#user-scores tbody");
  
    if (!tbody) {
      console.error("Admin panel table not found.");
      return;
    }
  
    tbody.innerHTML = "";
  
    userScores.forEach((user) => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${user.username}</td><td>${user.score}</td>`;
      tbody.appendChild(row);
    });
  }
  function displayUserScores() {
    const userScores = JSON.parse(localStorage.getItem("userScores")) || [];
    const tbody = document.querySelector("#user-scores tbody");

    if (!tbody) {
        console.error("Admin panel table not found.");
        return;
    }

    tbody.innerHTML = "";

    userScores.forEach((user) => {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${user.username}</td><td>${user.score}</td>`;
        tbody.appendChild(row);
    });

    if (userScores.length === 0) {
        const emptyRow = document.createElement("tr");
        emptyRow.innerHTML = `<td colspan="2">No user data available.</td>`;
        tbody.appendChild(emptyRow);
    }
}

document.addEventListener("DOMContentLoaded", displayUserScores);

  