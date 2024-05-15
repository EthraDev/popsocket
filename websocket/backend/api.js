let apiurl = "https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple";
let currentQuestionIndex = 0;

function startCountdown(time) {
    let countdown = time-1;
    let countdownElement = document.querySelector("#time");

    const countdownInterval = setInterval(() => {
        countdownElement.innerHTML = countdown;
        if (countdown > 0) {
            console.log(countdown);
            countdown--;
        }else{
            console.log("Time's up!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            return
        }
    }, 1000);
}

function displayQuestion(data) {
    let question = document.querySelector("#question");
    question.innerHTML = `<p>
    ${data.results[currentQuestionIndex].question}
    </p>`;

    let answer = document.querySelector("#answer");
    const answers = data.results[currentQuestionIndex].incorrect_answers.concat(data.results[currentQuestionIndex].correct_answer);
    answers.sort(() => Math.random() - 0.5);

    answer.innerHTML = "";

    answers.forEach(e => {
        answer.innerHTML += `
            <div id="answers">
                ${e}
            </div>
        `;
    });
    setTimeout(displayAnswer, 10000, data.results[currentQuestionIndex].correct_answer, data);
}

function displayAnswer(correctAnswer, data) {
    let answer = document.querySelector("#answer");
    answer.innerHTML = `<div id="correct">
                            ${correctAnswer}
                        </div>`;
    setTimeout(displayNextQuestion, 3000, data);
}

function displayNextQuestion(data) {
    currentQuestionIndex++;
    if (currentQuestionIndex < 10) {
        displayQuestion(data)
    }
}

let bt = document.querySelector("#start");
bt.addEventListener("click", function() {
    bt.style.display = "none";

    fetch(apiurl)
    .then((response) => response.json())
    .then(function(data) {
        displayQuestion(data);
    });
    startCountdown(10);
});

