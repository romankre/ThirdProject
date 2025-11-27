// Liste af ord
const words = [
  "planet","guitar","orange","butter","school","bridge","castle",
  "rabbit","jungle","silver","dragon","flower","puzzle","pirate",
  "market","island","forest","galaxy","wizard","bottle","candle",
  "camera","rocket","friend","garden","animal","cookie","hunter",
  "legend","circle","mirror","window","spring","summer","autumn",
  "winter","beauty","future","people","danger","energy","family",
  "banana","cheese","python","coding","memory","server","travel",
  "wonder"
];

const maxWrongGuesses = 6;

// ASCII hangman art
const hangmanSteps = [
`


=========`,
`
   |
   |
   |
   |
   |
=========`,
` +---.
 |   |
     |
     |
     |
     |
=========`,
` +---.
 |   |
 O   |
     |
     |
     |
=========`,
` +---.
 |   |
 O   |
 |   |
     |
     |
=========`,
` +---.
 |   |
 O   |
/|\\  |
     |
     |
=========`,
` +---.
 |   |
 O   |
/|\\  |
/ \\  |
=========`
];

// Her findes DOM elementer
const wordDisplay = document.querySelector(".word-display");
const hangmanFigure = document.getElementById("hangman-figure");
const keyboardElement = document.querySelector(".keyboard");
const wrongCountSpan = document.getElementById("wrong-count");
const messageElement = document.querySelector(".message");

// Her findes Stats elementer
const winsSpan = document.getElementById("wins");
const lossesSpan = document.getElementById("losses");
const gamesSpan = document.getElementById("games");

// Statistik som kan ændrer sig
let selectedWord = "";
let correctLetters = [];
let wrongLetters = [];
let gameOver = false;

// Load fra localStorage
function loadStats() {
  const raw = localStorage.getItem("hangmanStats");
  if (!raw) return;

  try {
    const data = JSON.parse(raw);
    stats = data;
  } catch {}
}
//Statisktik + localStorage
let stats = { wins: 0, losses: 0, games: 0 };

// Gem statistik om spillet
function saveStats() {
  localStorage.setItem("hangmanStats", JSON.stringify(stats));
}

// Her vises statistik på skærmen
function renderStats() {
  winsSpan.textContent = stats.wins;
  lossesSpan.textContent = stats.losses;
  gamesSpan.textContent = stats.games;
}

// Vælg en ord
function pickRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// Opdatager bogstaverne på skærmen
function updateWordDisplay() {
  wordDisplay.innerHTML = "";

  let complete = true;

  for (let i = 0; i < selectedWord.length; i++) {
    const letter = selectedWord[i];
    const li = document.createElement("li");
    li.classList.add("letter");

    if (correctLetters.includes(letter)) {
      li.textContent = letter.toUpperCase();
    } else {
      li.textContent = "";
      complete = false;
    }
    wordDisplay.appendChild(li);
  }

  if (complete) finishGame("win");
}

// Opdatager forkerte gæt og selve hangman handlinger
function updateWrongState() {
  wrongCountSpan.textContent = wrongLetters.length;
  hangmanFigure.textContent = hangmanSteps[wrongLetters.length];

  if (wrongLetters.length >= maxWrongGuesses) finishGame("loss");
}

// Når spiller gætter et bogstav
function handleGuess(letter) {
  if (gameOver) return;

  if (correctLetters.includes(letter) || wrongLetters.includes(letter)) return;

  if (selectedWord.includes(letter)) {
    correctLetters.push(letter);
  } else {
    wrongLetters.push(letter);
  }

  updateWordDisplay();
  updateWrongState();
  disableKeyboardButton(letter);
}

// Her deaktiveres en knap på tastatur
function disableKeyboardButton(letter) {
  const btn = keyboardElement.querySelector(`[data-letter="${letter}"]`);
  if (btn) btn.disabled = true;
}

// Her laves A–Z knapper
function renderKeyboard() {
  keyboardElement.innerHTML = "";

  const letters = "abcdefghijklmnopqrstuvwxyz";

  for (let char of letters) {
    const btn = document.createElement("button");
    btn.textContent = char;
    btn.dataset.letter = char;

    btn.addEventListener("click", () => handleGuess(char));
    keyboardElement.appendChild(btn);
  }
}

// Her slukkes hele tastatur
function disableKeyboard() {
  document.querySelectorAll(".keyboard button")
          .forEach(btn => btn.disabled = true);
}

// Spillet er færdig
function finishGame(result) {
  if (gameOver) return;

  gameOver = true;
  stats.games++;

  if (result === "win") {
    stats.wins++;
    messageElement.textContent = "You WON! Word: " + selectedWord.toUpperCase();
  } else {
    stats.losses++;
    messageElement.textContent = "You LOST! Word: " + selectedWord.toUpperCase();
  }

  saveStats();
  renderStats();
  disableKeyboard();
}

// Start ny en spil
function initGame() {
  selectedWord = pickRandomWord();
  correctLetters = [];
  wrongLetters = [];
  gameOver = false;
  messageElement.textContent = "";

  updateWordDisplay();
  updateWrongState();
  renderKeyboard();
}

// Start
loadStats();
renderStats();
initGame();
