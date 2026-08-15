/* =========================================
   SPIN THE BOTTLE
   0 DAN YANGI VERSIYA
========================================= */


/* =========================
   O'YINCHILAR
========================= */

const players = [
  {
    name: "Madina",
    avatar: "👩🏻",
    kisses: 4
  },
  {
    name: "Aziza",
    avatar: "👩🏼",
    kisses: 7
  },
  {
    name: "Jasur",
    avatar: "👨🏻",
    kisses: 2
  },
  {
    name: "Bekzod",
    avatar: "👨🏼",
    kisses: 5
  },
  {
    name: "Malika",
    avatar: "👩🏽",
    kisses: 9
  },
  {
    name: "Sardor",
    avatar: "👨🏽",
    kisses: 3
  }
];


/* =========================
   ELEMENTLAR
========================= */

const bottle = document.getElementById("bottle");
const playerCount = document.getElementById("playerCount");

const seats = document.querySelectorAll(".seat");
const popup = document.getElementById("resultPopup");
const resultName = document.getElementById("resultName");
const closeResult = document.getElementById("closeResult");

const chatForm = document.getElementById("chatForm");
const messageInput = document.getElementById("messageInput");
const messages = document.getElementById("messages");

const quickButtons = document.querySelectorAll(
  ".quick-messages button"
);


/* =========================
   O'YINCHI SONI
========================= */

playerCount.textContent = players.length;


/* =========================
   O'YINCHILARNI JOYLASHTIRISH
========================= */

function shuffle(array) {

  const copy = [...array];

  for (let i = copy.length - 1; i > 0; i--) {

    const j = Math.floor(Math.random() * (i + 1));

    [copy[i], copy[j]] =
      [copy[j], copy[i]];
  }

  return copy;
}


function createPlayerElement(player) {

  const element = document.createElement("div");

  element.className = "player";

  element.innerHTML = `
    <div class="avatar">
      ${player.avatar}
    </div>

    <div class="player-name">
      ${player.name}
    </div>

    ${
      player.kisses > 0
        ? `<div class="kiss-count">♥ ${player.kisses}</div>`
        : ""
    }
  `;

  return element;
}


function renderPlayers() {

  const shuffledPlayers = shuffle(players);

  seats.forEach((seat, index) => {

    seat.innerHTML = "";

    if (shuffledPlayers[index]) {

      const player =
        createPlayerElement(shuffledPlayers[index]);

      player.dataset.playerIndex =
        players.indexOf(shuffledPlayers[index]);

      seat.appendChild(player);

    } else {

      const empty = document.createElement("div");

      empty.className = "player empty";

      empty.innerHTML = `
        <div class="avatar">+</div>
      `;

      seat.appendChild(empty);
    }
  });
}


renderPlayers();


/* =========================
   AKTIV O'YINCHI
========================= */

let currentPlayerIndex = 0;

function setActivePlayer() {

  document
    .querySelectorAll(".player")
    .forEach(player => {
      player.classList.remove("active");
    });

  const playerElements =
    document.querySelectorAll(".player:not(.empty)");

  if (!playerElements.length) return;

  const active =
    playerElements[
      currentPlayerIndex % playerElements.length
    ];

  if (active) {
    active.classList.add("active");
  }
}

setActivePlayer();


/* =========================
   BOTTLE SPIN
========================= */

let isSpinning = false;

bottle.addEventListener("click", () => {

  if (isSpinning) return;

  isSpinning = true;

  bottle.classList.remove("spinning");

  /*
    Browser animationni qayta boshlashi uchun
    kichik reflow.
  */
  void bottle.offsetWidth;

  bottle.classList.add("spinning");


  setTimeout(() => {

    bottle.classList.remove("spinning");

    choosePlayer();

    isSpinning = false;

  }, 3000);
});


/* =========================
   KIMGA TUSHISHI
========================= */

function choosePlayer() {

  const activePlayers =
    Array.from(
      document.querySelectorAll(".player:not(.empty)")
    );

  if (!activePlayers.length) return;

  const randomIndex =
    Math.floor(
      Math.random() * activePlayers.length
    );

  const selected =
    activePlayers[randomIndex];

  const nameElement =
    selected.querySelector(".player-name");

  const selectedName =
    nameElement
      ? nameElement.textContent.trim()
      : "Noma'lum";

  resultName.textContent =
    selectedName;

  popup.classList.add("show");

  addSystemMessage(
    `🍾 Butilka ${selectedName} ni tanladi`
  );

}


/* =========================
   POPUP YOPISH
========================= */

closeResult.addEventListener("click", () => {

  popup.classList.remove("show");

  nextTurn();
});


popup.addEventListener("click", event => {

  if (event.target === popup) {

    popup.classList.remove("show");

    nextTurn();
  }
});


/* =========================
   NAVBAT
========================= */

function nextTurn() {

  currentPlayerIndex++;

  setActivePlayer();
}


/* =========================
   CHAT
========================= */

chatForm.addEventListener("submit", event => {

  event.preventDefault();

  const text =
    messageInput.value.trim();

  if (!text) return;

  addMessage(text, true);

  messageInput.value = "";

  messageInput.focus();
});


function addMessage(text, mine = false) {

  const message =
    document.createElement("div");

  message.className =
    mine
      ? "message me"
      : "message";

  message.textContent = text;

  messages.appendChild(message);

  scrollChat();
}


function addSystemMessage(text) {

  const message =
    document.createElement("div");

  message.className =
    "system-message";

  message.textContent = text;

  messages.appendChild(message);

  scrollChat();
}


function scrollChat() {

  messages.scrollTop =
    messages.scrollHeight;
}


/* =========================
   TEZKOR XABARLAR
========================= */

quickButtons.forEach(button => {

  button.addEventListener("click", () => {

    const text =
      button.dataset.message;

    if (!text) return;

    addMessage(text, true);
  });
});


/* =========================
   DEMO CHAT
========================= */

setTimeout(() => {

  addMessage(
    "Kim birinchi aylantiradi? 😏"
  );

}, 1200);


setTimeout(() => {

  addMessage(
    "Butilkaga tegish kifoya 🍾"
  );

}, 3000);
