let currentQuestionIndex = 0;

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

