let clickCount = 0;
let timeLeft = 20;
let gameDuration = 20;
let timerInterval = null;
let isGameRunning = false;

// elemen DOM
const clickBtn = document.getElementById("click-btn");
const clickCountText = document.getElementById("click-count");
const timerText = document.getElementById("timer");
const finalScoreText = document.getElementById("final-score");
const resetBtn = document.getElementById("reset-btn");
const modeSelect = document.getElementById("mode-select");
const goText = document.getElementById("go-text");
const leaderboardList = document.getElementById("leaderboard-list");

// leaderboard
let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
renderLeaderboard();

// mode change
modeSelect.addEventListener("change", () => {
  gameDuration = Number(modeSelect.value);
  resetGame();
});

// klik tombol
clickBtn.addEventListener("click", () => {
  if (!isGameRunning) {
    startGame();
  }

  if (timeLeft > 0) {
    clickCount++;
    clickCountText.textContent = `Clicks: ${clickCount}`;
  }
});

// mulai game
function startGame() {
  isGameRunning = true;
  clickCount = 0;
  timeLeft = gameDuration;

  clickCountText.textContent = "Clicks: 0";
  finalScoreText.textContent = "";

  goText.classList.remove("hidden");
  setTimeout(() => goText.classList.add("hidden"), 800);

  timerText.textContent = `Time Left: ${timeLeft}s`;

  timerInterval = setInterval(() => {
    timeLeft--;
    timerText.textContent = `Time Left: ${timeLeft}s`;

    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}

// selesai
function endGame() {
  clearInterval(timerInterval);
  isGameRunning = false;

  timerText.textContent = "Time's up!";
  finalScoreText.textContent = `Final Score: ${clickCount} clicks`;

  saveScore(clickCount, gameDuration);
  clickBtn.disabled = true;
}

// reset
resetBtn.addEventListener("click", resetGame);

function resetGame() {
  clearInterval(timerInterval);

  clickCount = 0;
  timeLeft = gameDuration;
  isGameRunning = false;

  clickCountText.textContent = "Clicks: 0";
  timerText.textContent = `Time Left: ${timeLeft}s`;
  finalScoreText.textContent = "";

  clickBtn.disabled = false;
}

// leaderboard logic
function saveScore(score, duration) {
  leaderboard.push({
    score,
    duration,
    date: new Date().toLocaleString()
  });

  leaderboard.sort((a, b) => b.score - a.score);
  leaderboard = leaderboard.slice(0, 5);

  localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
  renderLeaderboard();
}

function renderLeaderboard() {
  leaderboardList.innerHTML = "";

  leaderboard.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.score} clicks (${item.duration}s)`;
    leaderboardList.appendChild(li);
  });
}
