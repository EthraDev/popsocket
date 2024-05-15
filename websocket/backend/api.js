

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



