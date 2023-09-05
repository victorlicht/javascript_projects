const quizData = [
    {
        question: "What is the sum of 4 + 6?",
        a: "5",
        b: "10",
        c: "14",
        d: "2",
        correctOption: "b",
    },
    {
        question: "What is the best programming language?",
        a: "C/C++",
        b: "Java",
        c: "JavaScript",
        d: "Python",
        correctOption: "a",
    },
];

let currentQuestion = 0;

function generateQuestion() {
    const quizContainer = document.querySelector(".quiz-container");
    const questionData = quizData[currentQuestion];
    const htmlElement = `
        <div class="question-container">
            <h1>${currentQuestion + 1}. ${questionData.question}</h1>
            <ul class="questions">
                <li class="checkbox" id="a">${questionData.a}</li>
                <li class="checkbox" id="b">${questionData.b}</li>
                <li class="checkbox" id="c">${questionData.c}</li>
                <li class="checkbox" id="d">${questionData.d}</li>
            </ul>
        </div>
    `;
    quizContainer.innerHTML = htmlElement;
}
function selectAnswer() {
    const checkboxes = document.querySelectorAll(".checkbox");
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("click", () => {
            checkboxes.forEach((otherCheckboxes) => {
                if (otherCheckboxes !== checkbox) {
                    otherCheckboxes.classList.remove("checked");
                }
            });
            checkbox.classList.toggle("checked");
        });
    });
}
function checkAnswer() {
    const selectedAnswer = document.querySelector('.checked');
    if (!selectedAnswer) return false;

    const selectedAnswerId = selectedAnswer.id;
    return selectedAnswerId === quizData[currentQuestion].correctOption;
    
}

function displayResult(result) {
    console.log(result ? "Correct" : "Incorrect");
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        generateQuestion();
        selectAnswer();
    } else {
        console.log("Quiz finished!");
    }
}

generateQuestion();
selectAnswer();
document.querySelector("button").addEventListener("click", () => {
    const isCorrect = checkAnswer();
    displayResult(isCorrect);

    if (isCorrect) {
        nextQuestion();
    }
});
