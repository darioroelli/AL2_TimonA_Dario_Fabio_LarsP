const dino = document.getElementById("game-dino");
const rock = document.getElementById("game-rock");
const score = document.getElementById("game-score");
const highscore = document.getElementById("highscore");
const currentScore = document.getElementById("current-score");
const gameBox = document.getElementById("game");
const background = document.getElementById("game-background");
const gameOver = document.getElementById("game-end");
const winnerText = document.getElementById("game-winner");
const startScreen = document.getElementById("game-start");
const gameinfo = document.getElementById("game-info");
const gameScoreInfo = document.getElementById("game-score-info");
const highscoreForm = document.getElementById("inputhighscore");
const levelElement = document.getElementById("game-level");

let gameLoopInterval = 0;
let currentGameScore = 0;
let highestScore = 0;
const POINTS_TO_WIN = 1000;

const LEVEL_SCORES = [0, 250, 500, 750, 1000];
const LEVEL_SPEEDS = [0, 1.33, 1.2, 1.1, 1.0];

let currentLevel = 1;

const getCurrentLevel = (currentScore) => {
  for (let i = LEVEL_SCORES.length - 1; i >= 0; i--) {
    if (currentScore >= LEVEL_SCORES[i]) {
      return i + 1;
    }
  }
  return 1;
};

const updateLevel = (currentScore) => {
  const level = getCurrentLevel(currentScore);
  levelElement.innerText = level;
};

const getRockAnimationSpeed = (currentScore) => {
  const level = getCurrentLevel(currentScore);
  return LEVEL_SPEEDS[level];
};

const startGame = () => {
  gameOver.classList.add("hidden");
  background.classList.add("bg-animation");
  rock.classList.add("rock-animation");
  startScreen.classList.add("hidden");
  gameinfo.classList.add("hidden");
  gameScoreInfo.classList.remove("hidden");
  resetScore();
  startGameLoop();
};

const resetScore = () => {
  currentGameScore = 0;
  score.innerText = currentGameScore;
};

const updateHighscore = () => {
  highestScore = Math.max(highestScore, currentGameScore);
  highscore.innerText = highestScore;
  highscoreForm.value = highestScore;
};

const jump = () => {
  dino.classList.add("jump-animation");
  setTimeout(() => {
    dino.classList.remove("jump-animation");
  }, 500);
};

const dieAnimation = () => {
  dino.classList.add("dino-dies");
  return new Promise((resolve) =>
    setTimeout(() => {
      dino.classList.remove("dino-dies");
      resolve();
    }, 500)
  );
};

const handleInput = () => {
  if (!gameLoopInterval) {
    startGame();
  } else {
    if (!dino.classList.contains("jump-animation")) {
      jump();
    }
  }
};

gameBox.addEventListener("click", handleInput);

document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    event.preventDefault();
    handleInput();
  }
});

const stopGame = async () => {
  await dieAnimation();
  background.classList.remove("bg-animation");
  rock.classList.remove("rock-animation");
  startScreen.classList.remove("hidden");
  gameLoopInterval = clearInterval(gameLoopInterval);
  gameOver.classList.remove("hidden");
  updateHighscore();

  if (currentGameScore >= POINTS_TO_WIN) {
    winnerText.classList.remove("hidden");
    gameOver.classList.add("hidden");
  } else if (highscore.innerText >= POINTS_TO_WIN) {
    winnerText.classList.remove("hidden");
    gameOver.classList.add("hidden");
  } else {
    winnerText.classList.add("hidden");
    gameOver.classList.remove("hidden");
  }
};

const startGameLoop = () => {
  gameLoopInterval = window.setInterval(() => {
    const dinoTop = parseInt(
      window.getComputedStyle(dino).getPropertyValue("top")
    );
    const rockLeft = parseInt(
      window.getComputedStyle(rock).getPropertyValue("left")
    );

    currentGameScore++;
    score.innerText = currentGameScore;
    currentScore.innerText = currentGameScore;

    if (rockLeft < 0) {
      rock.classList.add("hidden");
    } else {
      rock.classList.remove("hidden");
    }

    if (rockLeft < 50 && rockLeft > 0 && dinoTop > 150) {
      stopGame();
    }

    const rockAnimationSpeed = getRockAnimationSpeed(currentGameScore);
    rock.style.animationDuration = `${rockAnimationSpeed}s`;

    const newLevel = getCurrentLevel(currentGameScore);
    if (newLevel !== currentLevel) {
      currentLevel = newLevel;
      updateLevel(currentGameScore);
    }
  }, 50);
};
