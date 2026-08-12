const bottle = document.getElementById("bottle");
const timerElement = document.getElementById("timer");
const turnText = document.getElementById("turnText");
const players = [...document.querySelectorAll(".player")];

const messages = document.getElementById("messages");
const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");

/*
  O'yinchilar stol atrofida SOAT STRELKASI bo'yicha:

  0 = tepa
  1 = o'ng
  2 = past
  3 = chap

  Navbat shu tartibda davom etadi.
*/

let currentPlayer = 0;
let countdown = 5;
let countdownInterval = null;
let isSpinning = false;
let rotation = 0;

const WAIT_SECONDS = 5;
const SPIN_TIME = 2800;

function updatePlayer() {
  players.forEach((player, index) => {
    player.classList.toggle("active", index === currentPlayer);
  });

  turnText.textContent =
    "Navbat: " + players[currentPlayer].innerText;
}

function addSystemMessage(text) {
  const message = document.createElement("div");

  message.className = "message system-message";
  message.textContent = text;

  messages.appendChild(message);
  messages.scrollTop = messages.scrollHeight;
}

function resetTimer() {
  clearInterval(countdownInterval);

  countdown = WAIT_SECONDS;
  timerElement.textContent = countdown;

  countdownInterval = setInterval(() => {
    if (isSpinning) return;

    countdown--;
    timerElement.textContent = countdown;

    if (countdown <= 0) {
      clearInterval(countdownInterval);

      // 5 soniya ichida tegilmasa avtomatik aylantirish
      spinBottle(true);
    }
  }, 1000);
}

function nextPlayer() {
  /*
    Soat strelkasi bo'yicha keyingi o'yinchi.
  */
  currentPlayer = (currentPlayer + 1) % players.length;

  updatePlayer();
  resetTimer();
}

function spinBottle(autoSpin = false) {
  if (isSpinning) return;

  isSpinning = true;
  clearInterval(countdownInterval);

  timerElement.textContent = "🍾";

  if (autoSpin) {
    addSystemMessage(
      players[currentPlayer].innerText +
      " 5 soniya ichida aylantirmadi — butilka avtomatik aylandi."
    );
  } else {
    addSystemMessage(
      players[currentPlayer].innerText +
      " butilkani aylantirdi."
    );
  }

  /*
    Har safar oldingi aylanishga yangi aylanish qo'shiladi.
    Shu sababli butilka doim tabiiy tarzda aylanadi.
  */
  rotation += 1080 + Math.floor(Math.random() * 720);

  bottle.style.transition =
    `transform ${SPIN_TIME}ms cubic-bezier(0.15, 0.75, 0.25, 1)`;

  bottle.style.transform = `rotate(${rotation}deg)`;

  setTimeout(() => {
    isSpinning = false;

    /*
      Butilka to'xtadi.
      Keyingi navbat soat strelkasi bo'yicha o'tadi.
    */
    nextPlayer();

  }, SPIN_TIME);
}

/*
  Faqat navbati kelgan o'yinchi butilkani bosishi mumkin.
  Mobil telefonda touch ham ishlaydi.
*/
bottle.addEventListener("click", () => {
  if (isSpinning) return;

  spinBottle(false);
});

/* =========================
   CHAT
========================= */

function sendMessage() {
  const text = messageInput.value.trim();

  if (!text) return;

  const message = document.createElement("div");
  message.className = "message";
  message.textContent = text;

  messages.appendChild(message);
  messages.scrollTop = messages.scrollHeight;

  messageInput.value = "";
  messageInput.focus();
}

sendButton.addEventListener("click", sendMessage);

messageInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    sendMessage();
  }
});

/* O'yinni boshlash */
updatePlayer();
resetTimer();
