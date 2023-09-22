// References
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount = 0;
let scoreCount = 0;
let count = 11;
let countdown;
let logoContainer = document.querySelector(".logo-container");

window.addEventListener("load", () => {
  document.body.style.opacity = 1;
  startScreen.classList.remove("hide");
  displayContainer.classList.add("hide");
});


// Questions and Options array
const quizArray = [
  {
    id: "0",
    question: "What does Ronan Traynor dress up as for the Verve halloween party every year?",
    options: ["Elvis", "Superman", "Pirate", "Darth Vader"],
    correct: "Pirate",
  },
  {
    id: "1",
    question: "How does the Halloween party end each year?",
    options: ["A flash mob", "Firework display", "A spooky story", "Silent disco"],
    correct: "Firework display",
  },
  {
    id: "2",
    question: "In which country did Halloween originate?",
    options: ["United States", "Ireland", "Mexico", "Germany"],
    correct: "Ireland",
  },
  {
    id: "3",
    question: "What is the fear of Halloween called?",
    options: ["Pumpkinphobia", "Samhainophobia", "Halloweenscardia", "Spookophobia"],
    correct: "Samhainophobia",
  },
  {
    id: "4",
    question: "What is the name of the festival that Halloween is believed to have originated from?",
    options: ["All Hallows Day", "Harvest Festival", "Samhain", "Walpurgisnacht"],
    correct: "Samhain",
  },
  {
    id: "5",
    question: "Which mythical creature is said to transform from human to bat and back during Halloween?",
    options: ["Werewolf", "Zombie", "Vampire", "Ghost"],
    correct: "Vampire",
  },
  {
    id: "6",
    question: "What do people commonly bob for on Halloween?",
    options: ["Apples", "Pumpkins", "Oranges", "Potatoes"],
    correct: "Apples",
  },
  {
    id: "7",
    question: "In Mexican culture, what holiday honors deceased loved ones and is celebrated from October 31st to November 2nd?",
    options: ["Dia de los Santos", "Fiesta de las Almas", "La Noche de Mil Mascaras", "Dia de los Muertos"],
    correct: "Dia de los Muertos",
  },
  {
    id: "8",
    question: "What were the original Jack o' Lanterns made of?",
    options: ["Pumpkins", "Turnips", "Apples", "Watermelons"],
    correct: "Turnips",
  },
  {
    id: "9",
    question: "What was Spotify's most streamed Halloween song last year?",
    options: ["This is Halloween", "Monster Mash", "Time Warp", "Thriller"],
    correct: "Monster Mash",
  },
  {
    id: "10",
    question: "What is a group of witches called?",
    options: ["A cupboard", "A cloak", "A flight", "A coven"],
    correct: "A coven",
  },
  {
    id: "11",
    question: "What edition of the Verve Halloween party will it be this year?",
    options: ["The 5th", "The 24th", "The 14th", "The 7th"],
    correct: "The 24th",
  },
  {
    id: "12",
    question: "What are the names of the office dogs?",
    options: ["Trixie & Bella", "Oscar & Jerry", "Roxy & Rex", "Woody & Bono"],
    correct: "Oscar & Jerry",
  },
  {
    id: "13",
    question: "What is the name of the Irish author of the Gothic masterpiece 'Dracula'?",
    options: ["Roddy Doyle", "Oscar Wilde", "Sally Rooney", "Bram Stoker"],
    correct: "Bram Stoker",
  },
  {
    id: "14",
    question: "Who played 'Wednesday Addams' in the 2022 Netflix show 'Wednesday'?",
    options: ["Olivia Rodrigo", "Selena Gomez", "Aubrey Plaza", "Jenna Ortega"],
    correct: "Jenna Ortega",
  },
// Rest of the questions...
];

// Hide logo when start button is clicked
startButton.addEventListener("click", () => {
  startScreen.classList.add("hide");
  displayContainer.classList.remove("hide");
  if (logoContainer.parentNode) {
    logoContainer.parentNode.removeChild(logoContainer);
  }
  initial();
});
// Restart Quiz
restart.addEventListener("click", () => {
  location.reload();
});

// Next Button
nextBtn.addEventListener("click", () => {
  displayNext();
});

// Timer
const timerDisplay = () => {
  countdown = setInterval(() => {
    count--;
    timeLeft.innerHTML = `${count}s`;
    if (count === 0) {
      clearInterval(countdown);
      displayNext();
    }
  }, 1000);
};

// Display quiz
const quizDisplay = (questionCount) => {
  const quizCards = document.querySelectorAll(".container-mid");
  // Hide other cards
  quizCards.forEach((card) => {
    card.classList.add("hide");
  });
  // Display current question card
  quizCards[questionCount].classList.remove("hide");
};

// Quiz Creation
function quizCreator() {
  // Randomly sort questions
  quizArray.sort(() => Math.random() - 0.5);
  // Generate quiz
  for (let i of quizArray) {
    // Randomly sort options
    i.options.sort(() => Math.random() - 0.5);
    // Quiz card creation
    let div = document.createElement("div");
    div.classList.add("container-mid", "hide");
    // Question number
    countOfQuestion.innerHTML = `${questionCount + 1} of ${quizArray.length} Question`;
    // Question
    let question_DIV = document.createElement("p");
    question_DIV.classList.add("question");
    question_DIV.innerHTML = i.question;
    div.appendChild(question_DIV);
    // Options
    for (let j = 0; j < i.options.length; j++) {
      let optionBtn = document.createElement("button");
      optionBtn.classList.add("option-div");
      optionBtn.innerHTML = i.options[j];
      optionBtn.addEventListener("click", () => checker(optionBtn, i.correct));
      div.appendChild(optionBtn);
    }
    quizContainer.appendChild(div);
  }
}

function checker(userOption, correctOption) {
  let userSolution = userOption.innerText;
  let question = document.getElementsByClassName("container-mid")[questionCount];
  let options = question.querySelectorAll(".option-div");

  if (userSolution === correctOption) {
    userOption.classList.add("correct");
    scoreCount++;
  } else {
    userOption.classList.add("incorrect");
    
    options.forEach((element) => {
      if (element.innerText == correctOption) {
        element.classList.add("correct");
      }
    });
  }

  // Clear interval (stop timer)
  clearInterval(countdown);
  // Disable all options
  options.forEach((element) => {
    element.disabled = true;
  });
}

function initial() {
  quizContainer.innerHTML = "";
  questionCount = 0;
  scoreCount = 0;
  count = 11;
  clearInterval(countdown);
  timerDisplay();
  quizCreator();
  quizDisplay(questionCount);
}

// Hide quiz and display start screen
window.onload = () => {
  startScreen.classList.remove("hide");
  displayContainer.classList.add("hide");
};

// Display next question or score
function displayNext() {
  // Increment questionCount
  questionCount += 1;
  // If last question
  if (questionCount === quizArray.length) {
    // Hide question container and display score
    displayContainer.classList.add("hide");
    scoreContainer.classList.remove("hide");
    // Score
    userScore.innerHTML = `Your score is ${scoreCount} out of ${questionCount}`;
  } else {
    // Display questionCount
    countOfQuestion.innerHTML = `${questionCount + 1} of ${quizArray.length} Question`;
    // Display quiz
    quizDisplay(questionCount);
    count = 11;
    clearInterval(countdown);
    timerDisplay();
  }
}
