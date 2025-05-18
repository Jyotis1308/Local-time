// Array of random emojis
const emojis = ["🤣", "😂", "😎", "🤩", "😊", "😍", "🥺", "😜", "😅", "🤪"];

// Select the emoji element
const emojiElement = document.getElementById("emoji");

// Function to change emoji on hover
emojiElement.addEventListener("mouseenter", () => {
  // Randomly select an emoji from the emojis array
  const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
  emojiElement.textContent = randomEmoji;
  emojiElement.style.filter = "none"; // Reset grayscale filter
});

// Function to change emoji back to grayscale on mouse out
emojiElement.addEventListener("mouseleave", () => {
  emojiElement.style.filter = "grayscale(100%)"; // Apply grayscale filter
});

