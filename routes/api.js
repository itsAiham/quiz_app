const express = require("express");
const _ = require('underscore');
const router = express.Router();


// the users is not user in the app, can retrived user api
const users = [
  {
    id: 1,
    name: "user",
    email: "user@email.com",
    password: "123123",
  },
];

const quizes = [
  {
    id: 0,
    numberOfQuestion: 3,
    createrID: 0,
    numberOfPoints: 5,
    topic: "Basic Quiz",
    questions: [
      {
        questionID: 0,
        question: "What is the languages/tools used in front-end?",
        answersType: "checkbox",
        correctAnswers: ["css", "js"],
        wrongAnswers: ["python", "Java"],
      },
      {
        questionID: 1,
        question:
          "Between the following, What is programming language used in back-end?",
        answersType: "radio",
        correctAnswers: ["Python"],
        wrongAnswers: ["HTML", "CSS", "SCSS"],
      },
      {
        questionID: 2,
        question: "What is the name of the uni which provides front-end course",
        answersType: "input",
        correctAnswers: ["HKR"],
        wrongAnswers: [],
      },
    ],
  },
];

let answers = [];

const db = {
  user: users,
  quiz: quizes,
};

router.get("/result", async (req, res) => {
  const query = req.query;

  const quiz_obj = Object.values(quizes).find((obj) => {
    return obj.id == query.id;
  });
  console.log(quiz_obj);

  res.json({
    confirmation: "seccess",
    data: {
      quiz: quiz_obj,
      answers
    },
  });
});

router.post("/add_quiz", async (req, res) => {
  if (req.body === null) {
    res.json({
      confirmation: "fail",
      messsage: "Fail to post",
    });
    return;
  }

  console.log(req.body);
  quizes.push(req.body)
});

  


router.get("/:resource", async (req, res) => {
  const resource = req.params.resource;
  const query = req.query;

  let data;
  if (_.isEmpty(query)){
      data = db[resource];
  }
  else {
    
    data = Object.values(quizes).find((obj) => {
      return obj.id == query.id;
    });
  }

  if (data != null) {
    res.json({
      confirmation: "seccess",
      data: data,
    });
  } else {

   
    res.json({
      confirmation: "fail",
      data: "Invalid Request",
    });
  }
});

router.post("/answers", (req, res) => {
  const resource = req.params.resource;

  if (req.body === null) {
    res.json({
      confirmation: "fail",
      messsage: "Fail to post",
    });
    return;
  }
  answers=JSON.parse(req.body['body'])
  console.log(answers);
  res.json({
    confirmation: "Seccess",
    data: answers,
  });
});

module.exports = router;
