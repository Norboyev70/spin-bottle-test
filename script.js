/* =====================================================
   SPIN THE BOTTLE
   ===================================================== */


/* =========================
   O'YINCHILAR
========================= */

let players = [
  {
    id: 1,
    name: "Ali",
    x: 50,
    y: 12,
    status: ""
  },
  {
    id: 2,
    name: "Vali",
    x: 88,
    y: 50,
    status: ""
  },
  {
    id: 3,
    name: "Sardor",
    x: 50,
    y: 88,
    status: ""
  },
  {
    id: 4,
    name: "Jasur",
    x: 12,
    y: 50,
    status: ""
  }
];


/* =========================
   ELEMENTLAR
========================= */

const playersContainer =
  document.getElementById("players");

const bottle =
  document.getElementById("bottle");

const spinButton =
  document.getElementById("spinButton");

const addPlayerButton =
  document.getElementById("addPlayerButton");

const playerCount =
  document.getElementById("playerCount");

const messages =
  document.getElementById("messages");

const chatForm =
  document.getElementById("chatForm");

const chatInput =
  document.getElementById("chatInput");


/* =========================
   HOLATLAR
========================= */

let bottleRotation = 0;

let spinning = false;

let nextPlayerId = 5;


/*
  Muhim:

  0 qiymati ko'rsatilmaydi.

  Agar playerning holati hali bo'lmasa:
  status = ""

  Shuning uchun ekranda "0" chiqmaydi.
*/


/* =========================
   O'YINCHILARNI CHIZISH
========================= */

function renderPlayers() {

  playersContainer.innerHTML = "";

  players.forEach(player => {

    const element =
      document.createElement("div");

    element.className = "player";

    element.dataset.id = player.id;

    element.style.left =
      player.x + "%";

    element.style.top =
      player.y + "%";


    const name =
      document.createElement("div");

    name.className =
      "player-name";

    name.textContent =
      player.name;


    const status =
      document.createElement("div");

    status.className =
      "player-status";

    /*
      0 ni hech qachon chiqarma
    */

    if (
      player.status !== "" &&
      player.status !== 0 &&
      player.status !== "0"
    ) {

      status.textContent =
        player.status;

    } else {

      status.textContent =
        "";

    }


    element.appendChild(name);

    element.appendChild(status);

    playersContainer.appendChild(element);

  });


  playerCount.textContent =
    players.length + " o'yinchi";
}


/* =========================
   FAOL O'YINCHINI BELGILASH
========================= */

function setActivePlayer(id) {

  document
    .querySelectorAll(".player")
    .forEach(element => {

      element.classList.remove("active");

    });


  const selected =
    document.querySelector(
      `.player[data-id="${id}"]`
    );


  if (selected) {

    selected.classList.add("active");

  }

}


/* =========================
   CHATGA SYSTEM XABAR
========================= */

function addSystemMessage(text) {

  const message =
    document.createElement("div");

  message.className =
    "message system";

  message.textContent =
    text;

  messages.appendChild(message);

  messages.scrollTop =
    messages.scrollHeight;
}


/* =========================
   SHISHA AYLANTIRISH
========================= */

function spinBottle() {

  if (spinning) {
    return;
  }

  if (players.length < 2) {

    addSystemMessage(
      "Kamida 2 ta o'yinchi kerak."
    );

    return;
  }


  spinning = true;

  spinButton.disabled = true;


  /*
    Oldingi active holatni olib tashlash
  */

  document
    .querySelectorAll(".player")
    .forEach(element => {

      element.classList.remove("active");

    });


  /*
    Tasodifiy o'yinchi
  */

  const selectedIndex =
    Math.floor(
      Math.random() * players.length
    );

  const selectedPlayer =
    players[selectedIndex];


  /*
    Shishani bir necha marta aylantirish.
  */

  const extraRotation =
    720 +
    Math.floor(Math.random() * 720);


  bottleRotation +=
    extraRotation;


  /*
    Tanlangan o'yinchining stol markazidan
    yo'nalishini hisoblash.

    x/y foizlari orqali burchak topamiz.
  */

  const dx =
    selectedPlayer.x - 50;

  const dy =
    selectedPlayer.y - 50;


  let angle =
    Math.atan2(dy, dx) *
    180 /
    Math.PI;


  /*
    Shisha emoji yuqoriga qarab turadi.
    Shuning uchun +90.
  */

  angle += 90;


  /*
    Yakuniy aylanish
  */

  const finalRotation =
    bottleRotation + angle;


  bottle.style.transform =
    `translate(-50%, -50%) rotate(${finalRotation}deg)`;


  /*
    Animatsiya tugagach
    natijani chiqaramiz.
  */

  setTimeout(() => {

    setActivePlayer(
      selectedPlayer.id
    );


    addSystemMessage(
      "Shisha " +
      selectedPlayer.name +
      " ni tanladi."
    );


    /*
      Bu yerda 0 qo'yilmaydi.

      Agar yangi hisob kerak bo'lsa,
      status bo'sh qoladi.
    */

    selectedPlayer.status = "";


    renderPlayers();

    setActivePlayer(
      selectedPlayer.id
    );


    spinning = false;

    spinButton.disabled = false;

  }, 3100);
}


/* =========================
   O'YINCHI QO'SHISH
========================= */

function addPlayer() {

  const name =
    prompt("O'yinchi ismini kiriting:");

  if (!name) {
    return;
  }


  const cleanName =
    name.trim();


  if (!cleanName) {
    return;
  }


  /*
    Yangi o'yinchini stolga
    taxminan bo'sh joyga qo'yish.
  */

  const positions = [

    { x: 50, y: 12 },
    { x: 88, y: 28 },
    { x: 88, y: 72 },
    { x: 50, y: 88 },
    { x: 12, y: 72 },
    { x: 12, y: 28 },
    { x: 28, y: 12 },
    { x: 72, y: 12 }

  ];


  const position =
    positions[
      (players.length - 4) %
      positions.length
    ];


  players.push({

    id: nextPlayerId++,

    name: cleanName,

    x: position.x,

    y: position.y,

    status: ""

  });


  renderPlayers();


  addSystemMessage(
    cleanName +
    " o'yinga qo'shildi."
  );
}


/* =========================
   O'YINCHI JOYINI ALMASHTIRISH
========================= */

/*
  Player ustiga bosib turganda
  boshqa joyga ko'chirish mumkin.

  Joyi o'zgarsa status yangidan boshlanadi.
*/

let movingPlayer = null;

let startX = 0;
let startY = 0;

let moved = false;


playersContainer.addEventListener(
  "pointerdown",
  function(event) {

    const playerElement =
      event.target.closest(".player");

    if (!playerElement) {
      return;
    }


    const id =
      Number(playerElement.dataset.id);


    movingPlayer =
      players.find(
        player => player.id === id
      );


    if (!movingPlayer) {
      return;
    }


    startX =
      event.clientX;

    startY =
      event.clientY;

    moved = false;


    playerElement.setPointerCapture?.(
      event.pointerId
    );

  }
);


playersContainer.addEventListener(
  "pointermove",
  function(event) {

    if (!movingPlayer) {
      return;
    }


    const dx =
      event.clientX - startX;

    const dy =
      event.clientY - startY;


    if (
      Math.abs(dx) > 5 ||
      Math.abs(dy) > 5
    ) {

      moved = true;

    }


    if (!moved) {
      return;
    }


    const table =
      document.querySelector(".game-table");


    const rect =
      table.getBoundingClientRect();


    let x =
      ((event.clientX - rect.left) /
        rect.width) *
      100;


    let y =
      ((event.clientY - rect.top) /
        rect.height) *
      100;


    /*
      Stol chegarasidan chiqib ketmasin.
    */

    x =
      Math.max(
        8,
        Math.min(92, x)
      );

    y =
      Math.max(
        8,
        Math.min(92, y)
      );


    movingPlayer.x = x;

    movingPlayer.y = y;


    /*
      JOY ALMASHGANDA HISOB YANGIDAN.
      0 yozilmaydi.
    */

    movingPlayer.status = "";


    renderPlayers();

  }
);


playersContainer.addEventListener(
  "pointerup",
  function() {

    if (
      movingPlayer &&
      moved
    ) {

      addSystemMessage(
        movingPlayer.name +
        " joyini almashtirdi — hisob yangidan boshlandi."
      );

    }


    movingPlayer = null;

  }
);


/* =========================
   CHAT
========================= */

chatForm.addEventListener(
  "submit",
  function(event) {

    event.preventDefault();


    const text =
      chatInput.value.trim();


    if (!text) {
      return;
    }


    const message =
      document.createElement("div");

    message.className =
      "message";

    message.textContent =
      text;


    messages.appendChild(message);


    chatInput.value = "";


    messages.scrollTop =
      messages.scrollHeight;
  }
);


/* =========================
   TUGMALAR
========================= */

spinButton.addEventListener(
  "click",
  spinBottle
);


addPlayerButton.addEventListener(
  "click",
  addPlayer
);


/* =========================
   BOSHLANG'ICH HOLAT
========================= */

renderPlayers();

addSystemMessage(
  "O'yin boshlandi. Shishani aylantiring."
);
