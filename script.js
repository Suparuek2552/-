const startScreen = document.getElementById("startScreen");
const gameScreen = document.getElementById("gameScreen");
const resultScreen = document.getElementById("resultScreen");

const startBtn = document.getElementById("startBtn");
const retryBtn = document.getElementById("retryBtn");
const homeBtn = document.getElementById("homeBtn");

const rope = document.getElementById("rope");
const timeText = document.getElementById("time");
const resultText = document.getElementById("resultText");
const scoreText = document.getElementById("scoreText");

let ropePos = 100; // ตำแหน่งเริ่ม
let leftScore = 0;
let rightScore = 0;
let time = 10;
let timer;

function showScreen(screen) {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    screen.classList.add("active");
}

startBtn.onclick = () => startGame();
retryBtn.onclick = () => startGame();
homeBtn.onclick = () => showScreen(startScreen);

function startGame() {
    ropePos = 100;
    leftScore = 0;
    rightScore = 0;
    time = 10;
    rope.style.left = ropePos + "px";
    timeText.textContent = time;

    showScreen(gameScreen);

    timer = setInterval(() => {
        time--;
        timeText.textContent = time;

        if (time <= 0) {
            endGame();
        }
    }, 1000);
}

document.addEventListener("keydown", e => {
    if (!gameScreen.classList.contains("active")) return;

    if (e.key === "a" || e.key === "A") {
        ropePos -= 5;
        leftScore++;
    }
    if (e.key === "ArrowRight") {
        ropePos += 5;
        rightScore++;
    }

    rope.style.left = ropePos + "px";

    // ชนะทันที
    if (ropePos <= 50) endGame("A");
    if (ropePos >= 150) endGame("B");
});

function endGame(winner) {
    clearInterval(timer);

    if (!winner) {
        if (leftScore > rightScore) winner = "A";
        else if (rightScore > leftScore) winner = "B";
        else winner = "เสมอ";
    }

    resultText.textContent =
        winner === "เสมอ" ? "🤝 เสมอกัน!" :
        winner === "A" ? "🏆 ฝั่ง A ชนะ!" : "🏆 ฝั่ง B ชนะ!";

    scoreText.textContent = `A: ${leftScore} | B: ${rightScore}`;

    showScreen(resultScreen);
}
