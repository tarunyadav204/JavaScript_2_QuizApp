const questions = [
    {
        question : "What is Your Name ? ",
        answers : [
          {text : "Tarun" ,correct : true},
          {text : "Yadav" ,correct : false},
          {text : "tarun" ,correct : false},
          {text : "yadav" ,correct : false},
        ]
    },

    {
        question : "What is Your Last Name ? ",
        answers : [
          {text : "Rao" ,correct : false},
          {text : "Yadav" ,correct : true},
          {text : "Ahir" ,correct : false},
          {text : "yadav" ,correct : false},
        ]
    },

    {
        question : "What is your age ? ",
        answers : [
          {text : "20" ,correct : false},
          {text : "21" ,correct : true},
          {text : "22" ,correct : false},
          {text : "23" ,correct : false},
        ]
    },

    {
        question : "Which is your sem ? ",
        answers : [
          {text : "5" ,correct : false},
          {text : "6" ,correct : false},
          {text : "7" ,correct : false},
          {text : "8" ,correct : true},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerbtn = document.getElementById("answer-btn");
const nextbtn = document.getElementById("nxt");

let currentIndexQues = 0;
let score = 0;

function quiz(){
    currentIndexQues = 0;
    score=0;
    nextbtn.innerHTML="Next";
    showQuiz();
}

function showQuiz(){
  resetState();
    let currentQues = questions[currentIndexQues];
    let questionNum = currentIndexQues + 1;
    questionElement.innerHTML=questionNum + ". " + currentQues.question;

    currentQues.answers.forEach(answer => {
         const button = document.createElement("button");
         button.innerHTML = answer.text;
          button.classList.add("btn");
         answerbtn.appendChild(button);

         if(answer.correct)
         {
          button.dataset.correct = answer.correct;
         }
         button.addEventListener("click" , selectAnswer);

    });
}

function selectAnswer(e){
  const select = e.target;
  const iscorrect = select.dataset.correct === "true";
  if(iscorrect)
  {
    select.classList.add("correct");
    score++;
  }
  else{
    select.classList.add("incorrect");
  }
  Array.from(answerbtn.children).forEach(button =>{
    if(button.dataset.correct === "true")
    {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextbtn.style.display="block";
}

function showScore(){
   resetState();
  questionElement.innerHTML = `Your score is ${score} out of ${questions.length}`;
  nextbtn.innerHTML = "Play Again";
  nextbtn.style.display="block";
}

function handleNextBtn(){
  currentIndexQues++;
  if(currentIndexQues < questions.length)
  {
    showQuiz();
  }
  else{
    showScore();
  }
}

nextbtn.addEventListener("click" , ()=>{
  if(currentIndexQues < questions.length)
  {
    handleNextBtn();
  }
  else{
    quiz();
  }
})

function resetState(){
  nextbtn.style.display="none";
  while(answerbtn.firstChild)
  {
    answerbtn.removeChild(answerbtn.firstChild);
  }
}

quiz();