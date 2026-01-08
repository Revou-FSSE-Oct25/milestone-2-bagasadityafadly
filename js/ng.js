// pilih angka (1 - 100)
let secretNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

// ambil elemen DOM
const userGuessInput = document.getElementById("user-guess");
const submitBtn = document.getElementById("submit-btn");
const resetBtn = document.getElementById("reset-btn");
const feedback = document.getElementById("feedback");
const attemptsText = document.getElementById("attempts");

// submit tebakan
submitBtn.addEventListener("click", () => {
  const userGuess = Number(userGuessInput.value);

  // validasi input
  if (!userGuess || userGuess < 1 || userGuess > 100) {
    feedback.textContent = "Please enter a number between 1 and 100.";
    feedback.className = "pb-2 text-yellow-600";
    return;
  }

  attempts++;
  attemptsText.textContent = `Attempts: ${attempts}`;

  if (userGuess === secretNumber) {
    feedback.textContent = `Correct! The number was ${secretNumber}.`;
    feedback.className = "pb-2 text-green-600";

    // disable input setelah menang
    submitBtn.disabled = true;
    userGuessInput.disabled = true;
  } else if (userGuess < secretNumber) {
    feedback.textContent = "Too low. Try again.";
    feedback.className = "pb-2 text-blue-600";
  } else {
    feedback.textContent = "Too high. Try again.";
    feedback.className = "pb-2 text-blue-600";
  }

  userGuessInput.value = "";
});

// reset game
resetBtn.addEventListener("click", () => {
  secretNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 0;

  feedback.textContent = "Make your guess!";
  feedback.className = "pb-2";
  attemptsText.textContent = "Attempts: 0";

  userGuessInput.value = "";
  userGuessInput.disabled = false;
  submitBtn.disabled = false;
});
