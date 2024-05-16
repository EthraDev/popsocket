let currentQuestionIndex = 0;
let score = 0;
let chosenAnswer = '';

function putAnswer(chose){
    console.log('il a choisi ce con');
    chosenAnswer = chose;
    console.log(chosenAnswer);
}

function displayQuestion(data) {
    socket.emit('getScores', room);
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
            <div class="answers" id="${e}" onClick="putAnswer('${e}')">
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
    if (chosenAnswer === correctAnswer) {
        score++;
        console.log(score);
        socket.emit('putScore', score);
    }
    
    
}

function displayNextQuestion(data) {
    currentQuestionIndex++;
    if (currentQuestionIndex < 10) {
        displayQuestion(data)
    }
}