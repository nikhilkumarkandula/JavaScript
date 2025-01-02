const questions = [
    {
        question: "Who is captain of RCB in 2016 ? ",
        answers : [
                {text : "K.L. Rahul", correct:false},
                {text : "Shane Watson", correct:false},
                {text : "V. Kohli", correct:true},
                {text : "AB Develliers", correct:false}
        ]
    },
    {
        question: "Who has most wickets in IPL 2016 ? ",
        answers : [
                {text : "J. Bumrah", correct:false},
                {text : "Bhuvaneshwar Kumar", correct:true},
                {text : "Rashid Khan", correct:false},
                {text : "Mustafizur Rahman", correct:false}
        ]
    },
    {
        question: "Which team has most number of sixes in 2016 ? ",
        answers : [
                {text : "RCB", correct:true},
                {text : "CSK", correct:false},
                {text : "SRH", correct:false},
                {text : "MI", correct:false}
        ]
    },
    {
        question: "Who are best duo in all time crciket ? ",
        answers : [
                {text : "Kohli - ABD", correct:true},
                {text : "Head - Abishek", correct:false},
                {text : "Ashwin - Jadeja", correct:false},
                {text : "Warner - Dhawan", correct:false}
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currenQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currenQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
function showQuestion(){
    resetState();
    let currenQuestion = questions[currenQuestionIndex];
    let questionNo = currenQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". "+ currenQuestion.question;

    currenQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
});
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const iscorrect = selectedBtn.dataset.correct === "true";
    if(iscorrect) {
        selectedBtn.classList.add("correct");
        score++;
    }else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct ==="true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currenQuestionIndex ++ ;
    if(currenQuestionIndex < questions.length){
        showQuestion();
    }else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currenQuestionIndex <questions.length){
        handleNextButton();
    }else {
        startQuiz();
    }
})

startQuiz();