/* =========================
   O'YINCHILAR
========================= */

const players = [
  {
    id: 1,
    name: "Player 1",
    avatar: "👨",
    kisses: 3
  },
  {
    id: 2,
    name: "Player 2",
    avatar: "👩",
    kisses: 7
  },
  {
    id: 3,
    name: "Player 3",
    avatar: "👨",
    kisses: 0
  },
  {
    id: 4,
    name: "Player 4",
    avatar: "👩",
    kisses: 2
  },
  {
    id: 5,
    name: "Player 5",
    avatar: "👨",
    kisses: 0
  },
  {
    id: 6,
    name: "Player 6",
    avatar: "👩",
    kisses: 5
  },
  {
    id: 7,
    name: "Player 7",
    avatar: "👨",
    kisses: 1
  },
  {
    id: 8,
    name: "Player 8",
    avatar: "👩",
    kisses: 0
  },
  {
    id: 9,
    name: "Player 9",
    avatar: "👨",
    kisses: 4
  },
  {
    id: 10,
    name: "Player 10",
    avatar: "👩",
    kisses: 0
  },
  {
    id: 11,
    name: "Player 11",
    avatar: "👨",
    kisses: 6
  },
  {
    id: 12,
    name: "Player 12",
    avatar: "👩",
    kisses: 0
  }
];


/* =========================
   ELEMENTLAR
========================= */

const table = document.querySelector(".table");
const playersContainer = document.getElementById("players");
const bottle = document.getElementById("bottle");

const chatInput = document.getElementById("chatInput");
const sendBtn = document.getElementById("sendBtn");
const messages = document.getElementById("messages");


/* =========================
   O'YINCHILARNI JOYLASHTIRISH
========================= */

function renderPlayers() {

  playersContainer.innerHTML = "";

  const tableSize = table.clientWidth;

  const center = tableSize / 2;

  /*
    Stol chetiga juda yaqin kelmasligi uchun
    ichkaridan radius olamiz.
  */

  const radius = (tableSize / 2) - 42;

  players.forEach((player, index) => {

    const angle =
      (-90 + index * (360 / players.length))
      * Math.PI / 180;

    const x =
      center + radius * Math.cos(angle);

    const y =
      center + radius * Math.sin(angle);

    const playerElement =
      document.createElement("div");

    playerElement.className = "player";

    playerElement.style.left = `${x}px`;
    playerElement.style.top = `${y}px`;

    /*
      0 bo'lsa yurakcha umuman ko'rinmaydi.
    */

    let kissesHTML = "";

    if (player.kisses > 0) {

      kissesHTML = `
        <div class="kisses">
          ❤️
          <span class="kiss-number">
            ${player.kisses}
          </span>
        </div>
      `;
    }

    playerElement.innerHTML = `

      ${kissesHTML}

      <div class="avatar">
        ${player.avatar}
      </div>

      <div class="player-name">
        ${player.name}
      </div>

    `;

    playersContainer.appendChild(playerElement);
  });
}


/* =========================
   BUTILKA AYLANISHI
========================= */

let spinning = false;

bottle.addEventListener("click", () => {

  if (spinning) return;

  spinning = true;

  /*
    Oldingi animationni qayta ishga tushirish
  */

  bottle.classList.remove("spinning");

  void bottle.offsetWidth;

  bottle.classList.add("spinning");

  addMessage(
    "System:",
    "Butilka aylandi..."
  );

  setTimeout(() => {

    bottle.classList.remove("spinning");

    spinning = false;

    /*
      Hozircha random o'yinchi tanlaymiz.
      Keyingi bosqichda butilka qaysi o'yinchiga
      qaraganini aniq hisoblaymiz.
    */

    const selectedIndex =
      Math.floor(Math.random() * players.length);

    const selectedPlayer =
      players[selectedIndex];

    addMessage(
      "System:",
      `Butilka ${selectedPlayer.name}ni tanladi ❤️`
    );

  }, 2500);

});


/* =========================
   CHAT
========================= */

function addMessage(name, text) {

  const message =
    document.createElement("div");

  message.className = "message";

  message.innerHTML =
    `<b>${name}</b> ${escapeHTML(text)}`;

  messages.appendChild(message);

  messages.scrollTop =
    messages.scrollHeight;
}


function sendMessage() {

  const text =
    chatInput.value.trim();

  if (!text) return;

  addMessage(
    "Siz:",
    text
  );

  chatInput.value = "";

  chatInput.focus();
}


sendBtn.addEventListener(
  "click",
  sendMessage
);


chatInput.addEventListener(
  "keydown",
  (event) => {

    if (event.key === "Enter") {
      sendMessage();
    }

  }
);


/* =========================
   XAVFSIZ MATN
========================= */

function escapeHTML(text) {

  const div =
    document.createElement("div");

  div.textContent = text;

  return div.innerHTML;
}


/* =========================
   O'LCHAM O'ZGARSA
========================= */

window.addEventListener(
  "resize",
  renderPlayers
);


/* =========================
   BOSHLASH
========================= */

renderPlayers();
