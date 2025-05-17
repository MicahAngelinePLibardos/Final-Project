const quizData = [
    {
        question: "Which of the following is a common stereotype about women?",
        options: ["Women are good at math", "Women are stronger than men", "Women rarely cries", "Women don't work hard"],
        answer: "Women don't work hard"
    },
    {
        question: "What is one important way to support women's rights?",
        options: ["Ignore the issue", "Educate yourself and others", "Blame women for problems", "Say nothing"],
        answer: "Educate yourself and others"
    },
    {
        question: "Which day is celebrated as International Women's Day?",
        options: ["January 1", "March 8", "July 4", "December 25"],
        answer: "March 8"
    },
    {
        question: "What is one common challenge women face in workplaces?",
        options: ["Equal opportunities", "Gender bias and discrimination", "Higher salaries", "More promotions"],
        answer: "Gender bias and discrimination"
    },
    {
        question: "How can society help create a safer environment for women?",
        options: ["Blame victims", "Ignore the issue", "Educate people and enforce laws", "Let women solve it alone"],
        answer: "Educate people and enforce laws"
    }
];

let currentQuestion = 0;
let score = 0;
const userAnswers = Array(quizData.length).fill(null);

const quizContainer = document.getElementById("quiz");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const submitButton = document.getElementById("submit");
const resultContainer = document.getElementById("result");

function loadQuestion() {
    const questionData = quizData[currentQuestion];
    quizContainer.innerHTML = `<h2>${questionData.question}</h2>`;

    questionData.options.forEach(option => {
        const isChecked = userAnswers[currentQuestion]?.answer === option;
        const isCorrect = quizData[currentQuestion].answer === option;
        const isWrong = isChecked && !isCorrect;

        quizContainer.innerHTML += `
            <label style="color: ${isChecked ? (isCorrect ? 'green' : 'red') : 'black'};">
                <input type="radio" name="answer" value="${option}" ${isChecked ? 'checked' : ''} onclick="checkAnswer(this)">
                ${option}
            </label><br>
        `;
    });
}

function getSelectedAnswer() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    return selectedOption ? selectedOption.value : null;
}

function checkAnswer(selected) {
    const selectedValue = selected.value;
    const correctAnswer = quizData[currentQuestion].answer;
    const isCorrect = selectedValue === correctAnswer;

    userAnswers[currentQuestion] = {
        answer: selectedValue,
        isCorrect: isCorrect
    };

    document.querySelectorAll('input[name="answer"]').forEach(input => {
        const label = input.parentElement;
        const val = input.value;

        if (val === correctAnswer) {
            label.style.color = val === selectedValue ? 'green' : 'black';
        } else if (val === selectedValue) {
            label.style.color = 'red';
        } else {
            label.style.color = 'black';
        }
    });
}

nextButton.addEventListener("click", () => {
    const answer = getSelectedAnswer();
    if (!answer && userAnswers[currentQuestion] === null) {
        alert("Please select an answer before proceeding.");
        return;
    }

    if (userAnswers[currentQuestion] && userAnswers[currentQuestion].isCorrect) {
        score++;
    }

    currentQuestion++;
    prevButton.disabled = currentQuestion === 0;
    if (currentQuestion < quizData.length) {
        loadQuestion();
    }

    if (currentQuestion === quizData.length - 1) {
        nextButton.style.display = "none";
        submitButton.style.display = "inline";
    }
});

prevButton.addEventListener("click", () => {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
        nextButton.style.display = "inline";
        submitButton.style.display = "none";
    }
    prevButton.disabled = currentQuestion === 0;
});

submitButton.addEventListener("click", () => {
    const answer = getSelectedAnswer();
    if (!answer && userAnswers[currentQuestion] === null) {
        alert("Please select an answer before submitting.");
        return;
    }

    if (userAnswers[currentQuestion] && userAnswers[currentQuestion].isCorrect) {
        score++;
    }

    quizContainer.style.display = "none";
    prevButton.style.display = "none";
    nextButton.style.display = "none";
    submitButton.style.display = "none";
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
});

loadQuestion();

