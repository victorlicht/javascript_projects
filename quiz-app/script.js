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
let isSubmitted = false;
function generateQuestion() {
    const quizContainer = document.querySelector(".quiz-container");
    const mainTag = document.querySelector("main");
    mainTag.innerHTML = '';
    const questionData = quizData[currentQuestion];
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
    
    const submitButton = `<button>Submit</button>`;
    mainTag.innerHTML += submitButton;
    
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
// to color later the correct and incorrect question
function setResult(result) {
    const selectedAnswer = document.querySelector('.checked');
    if (result) {
        selectedAnswer.classList.add("correct");
    } else {
        selectedAnswer.classList.add("incorrect");
    }
}

function submitQuestion() {
    const submitButton = document.querySelector("button");
    console.log(submitButton);
    submitButton.addEventListener("click", () => {
        console.log("Submit button clicked"); // Add this line for debugging
        const answer = checkAnswer();
        const result = setResult(answer);
        console.log("answer: ", answer);
        console.log("result: ", result);
        submitButton.textContent = "Next";
        if (!isSubmitted) {
            submitButton.textContent = "Next";
            isSubmitted = true;
        } else {
            // Handle next question logic here
            currentQuestion++;
            if (currentQuestion < quizData.length) {
                generateQuestion();
                submitButton.textContent = "Submit";
                isSubmitted = false;
            } else {
                console.log("Quiz finished!");
            }
        }
    });
}



generateQuestion();
selectAnswer();
submitQuestion();
//nextQuestion();

