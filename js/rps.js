const choices = ["rock", "paper", "scissors"];

let userScore = 0;
let computerScore = 0;

const userChoiceText = document.getElementById("user-choice");
const computerChoiceText = document.getElementById("computer-choice");
const roundResult = document.getElementById("round-result");
const scoreboard = document.getElementById("scoreboard");
const resetBtn = document.getElementById("reset-btn");

document.querySelectorAll(".choice-btn").forEach(button => {
  button.addEventListener("click", () => {
    const userChoice = button.id;
    playRound(userChoice);
  });
});

function playRound(userChoice) {
  const computerChoice = choices[Math.floor(Math.random() * choices.length)];

  userChoiceText.textContent = `Your Choice: ${userChoice}`;
  computerChoiceText.textContent = `Computer's Choice: ${computerChoice}`;

  if (userChoice === computerChoice) {
    roundResult.textContent = "It's a draw!";
    return;
  }

  const userWins =
    (userChoice === "rock" && computerChoice === "scissors") ||
    (userChoice === "paper" && computerChoice === "rock") ||
    (userChoice === "scissors" && computerChoice === "paper");

  if (userWins) {
    userScore++;
    roundResult.textContent = "You win this round!";
  } else {
    computerScore++;
    roundResult.textContent = "Computer wins this round!";
  }

  updateScore();
}

function updateScore() {
  scoreboard.textContent = `Score - You: ${userScore} | Computer: ${computerScore}`;
}

resetBtn.addEventListener("click", () => {
  userScore = 0;
  computerScore = 0;

  userChoiceText.textContent = "Your Choice:";
  computerChoiceText.textContent = "Computer's Choice:";
  roundResult.textContent = "Make your move!";
  updateScore();
});
