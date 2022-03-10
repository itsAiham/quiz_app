let quiz;

const addQuizInList = () => {
  const quiz_container = document.getElementById("quiz-list");
  for (let i = 0; i < quiz.length; i++) {
    quiz_container.innerHTML += `
        <a class="quiz-list" id="a${i}" href='/quiz.html?id=${quiz[i].id}' onclick="openQuiz(this)">
        <div>
          <label>Quiz ID: ${quiz[i].id}</label>
          <main>${quiz[i]['topic']}</main>
        </div>
      </a>
        `;
  }
};


function openQuiz(){
  let id = window.location.search.replace("?id=", "");
  console.log(id);
}

(async function () {
  await fetch("/api/quiz")
    .then((res) => res.json())
    .then((data) => (quiz = data.data))
    .catch(err => console.log(err));

  addQuizInList();


})();
