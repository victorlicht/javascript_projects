let currentQuestion = 0;
let isSubmitted = false;
let score = 0;
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
    {
        question: "What is the most used programming language?",
        a: "C/C++",
        b: "Java",
        c: "JavaScript",
        d: "Python",
        correctOption: "b",
    },
];

async function main() {
    await generateQuestion();
    for (let i = 0; i < quizData.length - 1; i++) {
        selectAnswer();
        await submitQuestion();
        await loadNextQuestion();
    }
    selectAnswer();
    submitQuestion();
    loadLastQuestion();
    displayScore();
}

async function generateQuestion() {
    const mainTag = document.querySelector("main");
    const questionData = quizData[currentQuestion];
    mainTag.innerHTML = '';
    const htmlElement = `
        <div class="quiz-container">
            <h1>${currentQuestion + 1}. ${questionData.question}</h1>
            <ul class="questions">
                <li class="checkbox" id="a">${questionData.a}</li>
                <li class="checkbox" id="b">${questionData.b}</li>
                <li class="checkbox" id="c">${questionData.c}</li>
                <li class="checkbox" id="d">${questionData.d}</li>
            </ul>
        </div>
    `;
    mainTag.innerHTML += htmlElement;
    // Add submit button
    const submitButtonElement = `<button></button>`;
    mainTag.innerHTML += submitButtonElement;
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

async function checkAnswer() {
    const selectedAnswer = document.querySelector('.checked');
    if (!selectedAnswer) return false;
    const selectedAnswerId = selectedAnswer.id;
    return selectedAnswerId === quizData[currentQuestion].correctOption;
}

// to color later the correct and incorrect question
function setResult(result) {
    const selectedAnswer = document.querySelector('.checked');
    if (result) {
        score++;
        selectedAnswer.classList.add("correct");
    } else {
        selectedAnswer.classList.add("incorrect");
    }
}

async function submitQuestion() {
    const submitButton = document.querySelector("button");
    if (submitButton.classList.contains("next-btn")) submitButton.classList.remove("next-btn");
    submitButton.innerHTML = 'Submit';

    return new Promise((resolve) => {
        submitButton.addEventListener("click", async () => {
            console.log("sub clicked");
            const selectedAnswer = await checkAnswer();
            setResult(selectedAnswer);
            submitButton.classList.add("next-btn");
            resolve(); // Resolve the promise to indicate completion.
        });
    });
}

async function loadNextQuestion() {
    const nextButton = document.querySelector(".next-btn");
    console.log(nextButton);
    nextButton.innerHTML = 'Next';

    return new Promise((resolve) => {
        nextButton.addEventListener("click", () => {
            console.log("next clicked");
            if (currentQuestion < quizData.length - 1) {
                currentQuestion++;
                generateQuestion();
            } else {
                // Handle the case when all questions have been answered.
                // For example, show the final score or end of quiz message.
                console.log("Quiz finished!");
            }
            resolve(); // Resolve the promise to indicate completion.
        });
    });
}


// This is for the last question because the next shouldn't display, just submit, then (Show the final result) after that we will see the score.
function loadLastQuestion() {
    // Implement the logic for the last question here.
}

// Display the final score.
function displayScore() {
    // Implement the logic to display the final score here.
}

main();
