let result = [];
let totalScore = 0;

function loogOverQuestion(quiz, answersArr) {
  const container = document.getElementById("result-container");

  for (let i = 0; i < quiz.numberOfQuestion; i++) {
    container.innerHTML += `
            <main id="quiz_form" class="container loop-question">
            <label id="question" class="q-label" for="question"> 
                ${quiz.questions[i].question}

            </label>
            <div class="answers" id='qe${i}'>
            
            </div>

            </main>
      
    `;

    const question = document.getElementById(`qe${i}`);
    const arr = quiz.questions[i].correctAnswers.concat(
      quiz.questions[i].wrongAnswers
    );

    for (let y = 0; y < arr.length; y++) {
      question.innerHTML += `
            <span class="show-choice ${checkUserAnswers(
              quiz,
              arr[y],
              i,
              answersArr
            )}">
                ${arr[y]}

            </span>    
            `;
    }
  }
}

function checkUserAnswers(quiz, answer, i, userAnswers) {
  const enteredAnswers = userAnswers[i].answer;
  const arr = quiz.questions[i].correctAnswers;
  let toReturn = "incorrect-answer";

  for (let y = 0; y < arr.length; y++) {
    if (
      quiz.questions[i].correctAnswers[y].toLocaleLowerCase() ==
      answer.toLocaleLowerCase()
    ) {
      toReturn = "correct-answer";
    } else if (
      enteredAnswers.toLocaleLowerCase() != answer.toLocaleLowerCase()
    ) {
      toReturn = " ";
    }
  }
  return toReturn;
}

(function () {
  const quizID = window.location.search;
  console.log("id" + quizID);

  fetch(`/api/result${quizID}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      totalScore = data.data.quiz.numberOfPoints;
      loogOverQuestion(data.data.quiz, data.data.answers);
      result.push(data);
    })
    .catch((err) => console.log(err));
})();
