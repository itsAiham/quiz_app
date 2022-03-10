const submitAnswers = (req, id) => {
  return new Promise((resolve, reject) => {
    fetch(`/api/${req}`, {
      method: "POST",
      body: JSON.stringify({
        quizID: id,
        body: JSON.stringify(answers),
        userID: 1,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};

let answers = [];

function answerClick(choice, question) {
  if (choice.checked) {
    if (choice.type == "radio") {
      answers = answers.filter((a) => a.question != question.innerText);
    }
    answers.push({ question: question.innerText, answer: choice.value });
  } else if (
    answers.indexOf(question.innerText) &&
    answers.indexOf(choice.value)
  ) {
    answers = answers.filter((a) => a.answer != choice.value);

  }
}

function add(answer, question) {
  answers.push({ question: question.innerText, answer: answer.value });
}

function inputChoiceWatcher(answer, question) {
  if (
    answers.length > 0 &&
    answers[answers.length - 1].question === question.innerText
  ) {
    answers[answers.length - 1].answer = answer.value;
    return;
  }
  answers.push({ question: question.innerText, answer: answer.value });
}

function emitAnswers(question) {
  const arr = question.correctAnswers.concat(question.wrongAnswers);

  if (arr.length == 1) {
    document.getElementById(
      "q"
    ).innerHTML = `<input class="choicesInput choice text-input" oninput="inputChoiceWatcher(this, question)" placeholder="Write Your Answer" id="questionInput" type="${question.answersType}"/> <br>`;
  } else {
    for (let i = 0; i < arr.length; i++) {
      document.getElementById(
        "q"
      ).innerHTML += `<input value="${arr[i]}" class="choicesInput" onclick="answerClick(this, question)" name="answer" id="questionInput" type="${question.answersType}"/> ${arr[i]} <br>`;
    }
  }
}

(async function () {
  let quiz;
  let nbrOfClick = 0;
  const quizID = window.location.search.replace("?id=", "");

  fetch(`/api/quiz/?id=${quizID}`)
    .then((res) => res.json())
    .then((data) => (quiz = data.data))
    .catch((err) => console.log(err));

  const question = document.getElementById("question");
  const nextBtn = document.getElementById("next-btn");

  window.addEventListener("load", () => {
    question.innerText = "Click to Start";
    nextBtn.value = "Start";
  });

  nextBtn.addEventListener("click", (event) => {
    if (answers.length !== nbrOfClick) {
      alert("The answer can not be empty!");
      return;
    }

    document.getElementById("q").innerHTML = "";

    if (nbrOfClick < quiz.numberOfQuestion) {
      emitAnswers(quiz.questions[nbrOfClick]);
      question.innerText = quiz.questions[nbrOfClick++].question;
      nextBtn.value = "Next";
    } else {
      question.innerText = "End Of Quiz, You are going to be directed soon";
      nextBtn.value = "Submit";

      submitAnswers("answers", quiz.id);

      setTimeout(() => {
        window.location.assign("result.html?id=" + quizID);
      }, 2000);
    }
  });
})();
