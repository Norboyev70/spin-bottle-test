const players = [];

const table = document.getElementById("table");
const playerBox = document.getElementById("players");

const bottle = document.getElementById("bottle");
const spinBtn = document.getElementById("spinBtn");

const modal = document.getElementById("modal");
const nameInput = document.getElementById("nameInput");

const addBtn = document.getElementById("addBtn");
const saveBtn = document.getElementById("saveBtn");
const cancelBtn = document.getElementById("cancelBtn");


/* O'YINCHI QO'SHISH */

addBtn.onclick = () => {

  modal.classList.remove("hidden");

  nameInput.value = "";

  nameInput.focus();
};


cancelBtn.onclick = () => {

  modal.classList.add("hidden");

};


saveBtn.onclick = addPlayer;


nameInput.addEventListener("keydown", (e) => {

  if (e.key === "Enter") {

    addPlayer();

  }

});


function addPlayer() {

  const name = nameInput.value.trim();

  if (!name) return;


  if (players.length >= 10) {

    alert("Maksimal 10 ta o'yinchi qo'shish mumkin.");

    return;

  }


  players.push(name);

  nameInput.value = "";

  modal.classList.add("hidden");

  renderPlayers();

}


/* O'YINCHILARNI JOYLASHTIRISH */

function renderPlayers() {

  playerBox.innerHTML = "";

  const rect = table.getBoundingClientRect();

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;


  const radiusX =
    Math.max(90, rect.width / 2 - 58);

  const radiusY =
    Math.max(105, rect.height / 2 - 50);


  players.forEach((name, index) => {

    const player = document.createElement("div");

    player.className = "player";

    player.textContent = name;

    const angle =
      (Math.PI * 2 * index / players.length)
      - Math.PI / 2;


    player.style.left =
      (centerX + radiusX * Math.cos(angle)) + "px";


    player.style.top =
      (centerY + radiusY * Math.sin(angle)) + "px";


    player.dataset.index = index;


    playerBox.appendChild(player);

  });

}


window.addEventListener("resize", renderPlayers);


/* BUTILKANI AYLANtirish */

let rotation = 0;

let spinning = false;


spinBtn.onclick = () => {

  if (spinning) return;


  if (players.length < 2) {

    alert("Kamida 2 ta o'yinchi qo'shing.");

    return;

  }


  spinning = true;

  spinBtn.disabled = true;


  document
    .querySelectorAll(".player")
    .forEach(player => {

      player.classList.remove("active");

    });


  const selected =
    Math.floor(Math.random() * players.length);


  const extraRotation =
    1440 + Math.random() * 720;


  rotation += extraRotation;


  bottle.style.transform =
    `translate(-50%, -50%) rotate(${rotation}deg)`;


  setTimeout(() => {

    const selectedPlayer =
      document.querySelector(
        `.player[data-index="${selected}"]`
      );


    if (selectedPlayer) {

      selectedPlayer.classList.add("active");

    }


    addMessage(
      `🎯 Butilka ${players[selected]} ni tanladi!`
    );


    spinning = false;

    spinBtn.disabled = false;

  }, 3300);

};


/* CHAT */

function addMessage(text) {

  const messages =
    document.getElementById("messages");


  const message =
    document.createElement("div");


  message.className = "message";

  message.textContent = text;


  messages.appendChild(message);


  messages.scrollTop =
    messages.scrollHeight;

}


document
  .getElementById("chatForm")
  .onsubmit = (e) => {

    e.preventDefault();


    const input =
      document.getElementById("chatInput");


    const text =
      input.value.trim();


    if (!text) return;


    addMessage(text);


    input.value = "";

  };
