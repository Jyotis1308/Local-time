let score = 0;
let targetColor = "Red";
const colors = ["Red", "Green", "Blue", "Yellow", "Purple", "Orange"];
const colorDisplay = document.getElementById("target-color");
const scoreDisplay = document.getElementById("score");
const gameContainer = document.body;

function changeColor() {
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  gameContainer.style.backgroundColor = randomColor.toLowerCase();
  targetColor = randomColor;
  colorDisplay.textContent = targetColor;
}

// When clicked on the screen, check if the color matches the target color
gameContainer.addEventListener("click", () => {
  if (gameContainer.style.backgroundColor === targetColor.toLowerCase()) {
    score += 10;
    scoreDisplay.textContent = `Score: ${score}`;
  } else {
    score -= 5;
    scoreDisplay.textContent = `Score: ${score}`;
  }
  changeColor();
});

// Start the game by changing color every 2-3 seconds
setInterval(changeColor, 2000);
