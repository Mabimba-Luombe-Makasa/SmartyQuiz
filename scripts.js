const questions = [
    {
        question: "What is the capital of France?",
        answers: [
            {text: "London", correct: "false"},
            {text: "Paris", correct: "true"},
            {text: "Rome", correct: "false"},
            {text: "Berlin", correct: "false"}
        ]
    },
    {
        question: "Who wrote the famous novel 'To Kill a Mockingbird'?",
        answers: [
            {text: "J.K. Rowling", correct: "false"},
            {text: "Harper Lee", correct: "true"},
            {text: "Ernest Hemingway", correct: "false"},
            {text: "F. Scott Fitzgerald", correct: "false"}
        ]
    },
    {
        question: "What is the chemical symbol for water?",
        answers: [
            {text: "H2O", correct: "true"},
            {text: "CO2", correct: "false"},
            {text: "NaCl", correct: "false"},
            {text: "O2", correct: "false"}
        ]
    },
    {
        question: "Which planet is known as the 'Red Planet'?",
        answers: [
            {text: "Jupiter", correct: "false"},
            {text: "Venus", correct: "false"},
            {text: "Mars", correct: "true"},
            {text: "Saturn", correct: "false"}
        ]
    },
    {
        question: "Who painted the Mona Lisa?",
        answers: [
            {text: "Leonardo da Vinci", correct: "true"},
            {text: "Michelangelo", correct: "false"},
            {text: "Pablo Picasso", correct: "false"},
            {text: "Vincent van Gogh", correct: "false"}
        ]
    },
    {
        question: "What is the currency of Japan?",
        answers: [
            {text: "Yen", correct: "true"},
            {text: "Euro", correct: "false"},
            {text: "Dollar", correct: "false"},
            {text: "Pound", correct: "false"}
        ]
    },
    {
        question: "What is the tallest mountain in the world?",
        answers: [
            {text: "Mount Everest", correct: "true"},
            {text: "K2", correct: "false"},
            {text: "Mount Kilimanjaro", correct: "false"},
            {text: "Mount Fuji", correct: "false"}
        ]
    },
    {
        question: "Who was the first woman to win a Nobel Prize?",
        answers: [
            {text: "Marie Curie", correct: "true"},
            {text: "Mother Teresa", correct: "false"},
            {text: "Rosa Parks", correct: "false"},
            {text: "Margaret Thatcher", correct: "false"}
        ]
    },
    {
        question: "What is the chemical symbol for gold?",
        answers: [
            {text: "Au", correct: "true"},
            {text: "Ag", correct: "false"},
            {text: "Fe", correct: "false"},
            {text: "Cu", correct: "false"}
        ]
    },
    {
        question: "What is the main ingredient in guacamole?",
        answers: [
            {text: "Tomato", correct: "false"},
            {text: "Onion", correct: "false"},
            {text: "Avocado", correct: "true"},
            {text: "Lime", correct: "false"}
        ]
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        answers: [
            {text: "William Shakespeare", correct: "true"},
            {text: "Charles Dickens", correct: "false"},
            {text: "Jane Austen", correct: "false"},
            {text: "Mark Twain", correct: "false"}
        ]
    },
    {
        question: "What is the largest organ in the human body?",
        answers: [
            {text: "Heart", correct: "false"},
            {text: "Liver", correct: "false"},
            {text: "Skin", correct: "true"},
            {text: "Brain", correct: "false"}
        ]
    },
    {
        question: "Which of these animals is a marsupial?",
        answers: [
            {text: "Kangaroo", correct: "true"},
            {text: "Giraffe", correct: "false"},
            {text: "Elephant", correct: "false"},
            {text: "Hippopotamus", correct: "false"}
        ]
    },
    {
        question: "Who is the author of 'The Lord of the Rings' trilogy?",
        answers: [
            {text: "J.R.R. Tolkien", correct: "true"},
            {text: "George R.R. Martin", correct: "false"},
            {text: "C.S. Lewis", correct: "false"},
            {text: "J.K. Rowling", correct: "false"}
        ]
    },
    {
        question: "What is the capital of Australia?",
        answers: [
            {text: "Sydney", correct: "false"},
            {text: "Melbourne", correct: "false"},
            {text: "Canberra", correct: "true"},
            {text: "Brisbane", correct: "false"}
        ]
    }
];


const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-button");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestions();
}

function showQuestions() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNumber = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNumber + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("button-1");
        answerButton.appendChild(button);

        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })
}

function resetState() {
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const iscorrect = selectedButton.dataset.correct === "true";

    if(iscorrect){
        selectedButton.classList.add("correct");
        score++;
    }
    else{
        selectedButton.classList.add("incorrect");
    }

    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = "true";
    })

    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    const scoreText = `Your score is ${score} out of ${questions.length}!`;
    questionElement.innerHTML = scoreText;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";

    let scoreColor = "";
    if (score >= 11) {
        scoreColor = "green";
    } else if (score >= 6) {
        scoreColor = "orange";
    } else {
        scoreColor = "red";
    }

    const scoreElement = document.createElement("span");
    scoreElement.textContent = scoreText;
    scoreElement.style.color = scoreColor;
    questionElement.innerHTML = ""; 
    questionElement.appendChild(scoreElement);
}


function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestions();
    }
    else{
        showScore();
    }
}

function generateSmoothColor(hue, saturation, lightness) {
    const radianHue = hue * Math.PI / 180;
    
    const red = Math.round(Math.sin(radianHue) * 127 + 128);
    const green = Math.round(Math.sin(radianHue + (2 * Math.PI / 3)) * 127 + 128);
    const blue = Math.round(Math.sin(radianHue + (4 * Math.PI / 3)) * 127 + 128);

    return `rgb(${red}, ${green}, ${blue})`;
}

function updateBackgroundColor() {
    const currentTime = new Date();
    const hue = (currentTime.getTime() / 1000) * 30;
    const smoothColor = generateSmoothColor(hue, 100, 50);
    document.body.style.background = smoothColor;
}

function startBackgroundAnimation() {
    setInterval(updateBackgroundColor, 50);
}

function handleNextButtonClick() {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
}


window.onload = startBackgroundAnimation;



nextButton.addEventListener("click", handleNextButtonClick);

startQuiz();