let apiurl = "https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple";
let currentQuestionIndex = 0;

function displayQuestion(data) {
    let question = document.querySelector("#question");
    question.innerHTML = data.results[currentQuestionIndex].question;

    let answer = document.querySelector("#answer");
    const answers = data.results[currentQuestionIndex].incorrect_answers.concat(data.results[currentQuestionIndex].correct_answer);
    answers.sort(() => Math.random() - 0.5);

    answer.innerHTML = "";

    answers.forEach(e => {
        answer.innerHTML += `
            <div class="rounded-3xl relative">
                <h2 class="p-2 text-xs sm:text-base xl:text-base absolute left-0 bottom-0 xl:bottom-[-10%] bg-orange-500 w-full rounded-b-3xl">${e}</h2>
            </div>
        `;
    });

    setTimeout(displayAnswer, 10000, data.results[currentQuestionIndex].correct_answer, data);
}

function displayAnswer(correctAnswer, data) {
    let answer = document.querySelector("#answer");
    answer.innerHTML = `<div class="rounded-3xl relative">
                            <h2 class="p-2 text-xs sm:text-base xl:text-base absolute left-0 bottom-0 xl:bottom-[-10%] bg-orange-500 w-full rounded-b-3xl">${correctAnswer}</h2>
                        </div>`;

    setTimeout(displayNextQuestion, 3000, data);
}

function displayNextQuestion(data) {
    currentQuestionIndex++;
    if (currentQuestionIndex < 10) {
        displayQuestion(data)
    }
}

fetch(apiurl)
    .then((response) => response.json())
    .then(function(data) {
        displayQuestion(data);
    });