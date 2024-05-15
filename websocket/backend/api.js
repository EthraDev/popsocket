let question = document.querySelector("#question")
let apiurl = "https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple"

fetch(apiurl).then((response) => response.json()).then(function(data) {
    data.results.forEach(e => {
        question.innerHTML += `
            <div class="rounded-3xl relative">
                <h2 class="p-2 text-xs sm:text-base xl:text-base absolute left-0 bottom-0 xl:bottom-[-10%] bg-orange-500 w-full rounded-b-3xl">${e.question}</h2>
            </div>
            `
    })
})