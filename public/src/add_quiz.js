let NUMBER_OF_NODES = 0;
let NUMBER_OF_QUESTION = 0;
let ANSWER_IS_WRONG = false;
let correct_answers = [];
let Incorrect_answers = [];

let question_toAdd = [];
const quiz = {
  id: Math.ceil(Math.random() * 9999),
  numberOfQuestion: 0,
  createrID: 0,
  numberOfPoints: (correct_answers.length += correct_answers.length),
  topic: prompt('Please Enter The Quiz Topic', "New Quiz"), // the user still can cancel and get a 'null' as a topic
  questions: question_toAdd,
};

const GREEN_COLOR = "rgba(96, 225, 122, 0.5)";
const RED_COLOR = "rgba(225, 96, 96, 0.994)";

function addOptionChild(choices) {
  NUMBER_OF_NODES++;
  choices.innerHTML += `<input type="quiz-opt" ondblclick="inputClicked(this)" name="option" id="quizOption" class="quiz-choice" placeholder=" Add An Option">`;
}

function validateInput(question) {
  const arr_option = document.querySelectorAll("#quizOption");
  const q_status = question.value == null ? false : true;

  for (const obj of arr_option) {
    if (obj.value == "") {
      return false;
    }
  }
  if (q_status) return true;
}

function addToAnswersArrays(choices) {
  console.log(choices);
  for (const obj of choices) {
    if (obj.value.trim() == "") {
      return false;
    } else if (obj.style.background.indexOf(GREEN_COLOR)) {
      Incorrect_answers.push(obj.value);
    } else {
      correct_answers.push(obj.value);
    }
  }
}

function checkQuestionType(textInput, radioInput, checkboxInput) {
  if (textInput) {
    return "text";
  }
  else if (radioInput) {
    return "radio";
  }
  else if (checkboxInput) {
    return "checkbox";
  }
  else {
    alert('Pick the answer type please!')
  }
}

function inputClicked(input) {
  ANSWER_IS_WRONG = !ANSWER_IS_WRONG;
  if (ANSWER_IS_WRONG) {
    input.style.background = GREEN_COLOR;
    quiz.numberOfPoints++;
  } else {
    input.style.background = null;
    quiz.numberOfPoints--;
  }


}

(function () {
  const question = document.getElementById("questionInput");
  const text = document.getElementById("text");
  const radio = document.getElementById("radio");
  const checkbox = document.getElementById("checkbox");
  const add_choice_btn = document.getElementById("add-choice-btn");
  const n_question = document.getElementById("nbr_question");
  const arr_option = document.querySelectorAll("#quizOption");

  const add_btn = document.getElementById("add-btn");
  const done_btn = document.getElementById("done-btn");

  const choices = document.getElementById("choices-container");

  addOptionChild(choices);

  n_question.addEventListener("load", () => {
    n_question.innerText = `${NUMBER_OF_QUESTION+1} / ${NUMBER_OF_QUESTION+1}`;
  });

  document
    .getElementById("quiz-type-container")
    .addEventListener("click", (event) => {
      if (radio.checked || checkbox.checked) {
        choices.innerHTML = null;
        NUMBER_OF_NODES = 0;
        addOptionChild(choices);
      }
      if (text.checked) {
        NUMBER_OF_NODES = 0;
        choices.innerHTML = null;
        addOptionChild(choices);
      }
    });

  add_choice_btn.addEventListener("click", () => {
    if (text.checked) {
      return;
    } else if (NUMBER_OF_NODES < 6) {
      addOptionChild(choices);
      return;
    }

    alert("You can not add more than six choices");
  });

  add_btn.addEventListener("click", () => {
    if (!validateInput(question)) {
      alert("Check that all fields are filled");
      return;
    }

    addToAnswersArrays(document.querySelectorAll("#quizOption"));

    const newQuestion = {
      questionID: NUMBER_OF_QUESTION++,
      question: question.value,
      answersType: checkQuestionType(text.checked, radio.checked, checkbox.checked),
      correctAnswers: correct_answers,
      wrongAnswers: Incorrect_answers,
    };

    question_toAdd.push(newQuestion);
    quiz.numberOfQuestion++;

    question.value = '';
    choices.innerHTML = '';

    choices.value = null

    correct_answers = [];
    Incorrect_answers = [];

    addOptionChild(choices);

  });

  done_btn.addEventListener("click", () => {
    if (document.getElementById('questionInput').value.trim() != '' || !NUMBER_OF_QUESTION){
        alert('Click on add question first to save the currently one!')
        return
    }
    fetch("/api/add_quiz", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(quiz),
    })
      .then((res) => res.json())
      .then(setTimeout(() => {
        window.location.assign("home.html");
      }, 1000))
      .catch((err) => console.log(err));
  });
  
})();
