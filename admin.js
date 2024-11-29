let questions = JSON.parse(localStorage.getItem("quizData")) || [];

// Display questions
function displayQuestions() {
  const questionsList = document.getElementById("questions-list");
  questionsList.innerHTML = questions
    .map(
      (q, i) => `
      <li>
        Q${i + 1}: ${q.question} <br>
        1. ${q.choices[0]}  2. ${q.choices[1]}  3. ${q.choices[2]} <br>
        Correct: ${q.correct + 1} 
        <button onclick="deleteQuestion(${i})">Delete</button>
      </li>`
    )
    .join("");
}

// Add a new question
document.getElementById("question-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const question = document.getElementById("question").value;
  const option1 = document.getElementById("option1").value;
  const option2 = document.getElementById("option2").value;
  const option3 = document.getElementById("option3").value;
  const correct = parseInt(document.getElementById("correct").value, 10) - 1;

  questions.push({
    question,
    choices: [option1, option2, option3],
    correct,
  });

  localStorage.setItem("quizData", JSON.stringify(questions));
  displayQuestions();
  e.target.reset();
});

// Delete a question
function deleteQuestion(index) {
  questions.splice(index, 1);
  localStorage.setItem("quizData", JSON.stringify(questions));
  displayQuestions();
}

// Initialize
displayQuestions();
