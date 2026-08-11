const playersContainer = document.getElementById("players");
const bottle = document.getElementById("bottle");

const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");
const messages = document.getElementById("messages");

/* =========================
   O'YINCHILAR
========================= */

const players = [
  {
    name: "Ali",
    avatar: "😎"
  },
  {
    name: "Vali",
    avatar: "😈"
  },
  {
    name: "Sardor",
    avatar: "🤠"
  },
  {
    name: "Jasur",
    avatar: "😎"
  },
  {
    name: "Bek",
    avatar: "🤑"
  },
  {
    name: "Aziz",
    avatar: "🤓"
  }
];


/* =========================
   O'YINCHILARNI AYLANA
   BO'YLAB JOYLASHTIRISH
========================= */

function createPlayers() {

  playersContainer.innerHTML = "";

  const total = players.length;

  const angleStep = 360 / total;

  players.forEach((player, index) => {

    const element = document.createElement("div");

    element.className = "player";

    element.innerHTML = `
      <div class="avatar">${player.avatar}</div>
      <div class="name">${player.name}</div>
    `;

    /*
      50% = stol markazi

      radius foizda beriladi.
      Shu sababli o'yinchilar
      dumaloq stol atrofida turadi.
    */

    const angle =
      (angleStep * index - 90) *
      Math.PI / 180;

    const radius = 43;

    const x =
      50 + Math.cos(angle) * radius;

    const y =
      50 + Math.sin(angle) * radius;

    element.style.left = `${x}%`;
    element.style.top = `${y}%`;

    playersContainer.appendChild(element);
  });
}


/* =========================
   BUTILKANI AYLANtirish
========================= */

let rotation = 0;

bottle.addEventListener("click", () => {

  const randomRotation =
    720 + Math.floor(Math.random() * 720);

  rotation += randomRotation;

  bottle.style.transform =
    `rotate(${rotation}deg)`;

  setTimeout(() => {

    addSystemMessage(
      "🍾 Butilka aylantirildi!"
    );

  }, 2000);
});


/* =========================
   CHAT
========================= */

function sendMessage() {

  const text =
    messageInput.value.trim();

  if (text === "") {
    return;
  }

  const message =
    document.createElement("div");

  message.className = "message";

  message.textContent = text;

  messages.appendChild(message);

  messageInput.value = "";

  messages.scrollTop =
    messages.scrollHeight;
}


function addSystemMessage(text) {

  const message =
    document.createElement("div");

  message.className =
    "message system";

  message.textContent = text;

  messages.appendChild(message);

  messages.scrollTop =
    messages.scrollHeight;
}


sendButton.addEventListener(
  "click",
  sendMessage
);


messageInput.addEventListener(
  "keydown",
  (event) => {

    if (event.key === "Enter") {
      sendMessage();
    }

  }
);


/* =========================
   BOSHLASH
========================= */

createPlayers();
