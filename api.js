function accessCategories() {
    const categ = 'https://opentdb.com/api_category.php';
    fetch(categ)
        .then((response) => response.json())
        .then((data) => printCategories(data.trivia_categories));
}

function printCategories(element) {
    const categories = document.getElementById('select-category');
    element.forEach((category) => {
        categories.innerHTML += `<option value="${category.id}">${category.name}</option>`;
    })
}

accessCategories();

let answersRequested = [];
let questionsRequested = 0;

function getQuestions() {
    const totalQuestions = document.getElementById('total-questions').value;
    const selectCategories = document.getElementById('select-category').value;
    const selectDifficulty = document.getElementById('select-difficulty').value;
    const selectType = document.getElementById('select-type').value;

    let url = `https://opentdb.com/api.php?amount=${totalQuestions}&category=${selectCategories}&difficulty=${selectDifficulty}&type=${selectType}`;

    // Caso 1: La dificultad y el tipo están en random
    // Caso 2: Dificultad seleccionada y el tipo en random
    // Caso 3: Dificultad en random y el tipo seleccionado
    // Caso 4: Dificultad y tipo seleccionados.

    if(selectDifficulty === "any" && selectType === "any") {
        url = `https://opentdb.com/api.php?amount=${totalQuestions}&category=${selectCategories}`;
    } if(selectDifficulty != "any" && selectType === "any") {
        url = `https://opentdb.com/api.php?amount=${totalQuestions}&category=${selectCategories}&difficulty=${selectDifficulty}`;
    } if(selectDifficulty === "any" && selectType != "any") {
        url = `https://opentdb.com/api.php?amount=${totalQuestions}&category=${selectCategories}&type=${selectType}`;
    }

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            printData(data.results);
            answersRequested = [...countAnswers(data.results)];
            console.log(answersRequested);
            questionsRequested = totalQuestions;
            console.log(questionsRequested);
        });
}

function printData(data) {
    const container = document.getElementById('questions-container');

    let html = '';

    data.forEach(element => {
        html += `<div class="col-md-4 mt-3" >
                    <div class="card h-100">
                        <div class="card-body">
                            ${element.question}
                            ${printAnwers(element)}
                        </div>
                    </div>
                </div>`;
    });

    html += `<button type="submit" class="btn btn-success btn-lg btn-block mt-5 mb-5">Verify Results!</button>`

    container.innerHTML = html;
}

function printAnwers(element) {
    let corrAnswer = element.correct_answer;
    let incorrAnswers = element.incorrect_answers;
    let totalAnswers = [...incorrAnswers];
    totalAnswers.splice(Math.floor(Math.random() * 4), 0, corrAnswer);

    let showAnswers = ``;

    totalAnswers.forEach(answer => {
        showAnswers += `<div class="form-check">
        <label><input class="form-check-input" type="radio" name="${element.question}" value="${answer}" required>${answer}</label>
      </div>`
    });

    return showAnswers;
}


function countAnswers(reagents) {
    const count = [];
    reagents.forEach(element => {
        count.push(element.correct_answer);
    });
    return count;
}

function verifyAnswers(answers, questions) {
    let correctAnswers = 0;
    let answersSelected = [...document.querySelectorAll(".form-check-input:checked")].map(element => element.value);
    console.log(answersSelected);


    for(let i = 0; i < answers.length; i++) {
        if(answers[i] === answersSelected[i]) {
            correctAnswers += 1;
        }
    }

    if(correctAnswers === questions) {
        alert(`All answers correct! ${correctAnswers} / ${questions}... You´re a genius!`);
    } else {
        alert(`You've got ${correctAnswers} / ${questions} correct!`);
    }
}