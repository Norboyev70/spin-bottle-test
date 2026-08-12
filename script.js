const bottle = document.getElementById("bottle");
const bottleTimer = document.getElementById("bottleTimer");

const kissScreen = document.getElementById("kissScreen");
const choiceTimer = document.getElementById("choiceTimer");

const chosenOne = document.getElementById("chosenOne");
const chosenTwo = document.getElementById("chosenTwo");

const refuseBtn = document.getElementById("refuseBtn");
const kissBtn = document.getElementById("kissBtn");

const players = Array.from(
  document.querySelectorAll(".player")
);

const turnText = document.getElementById("turnText");

const messages = document.getElementById("messages");

const messageInput =
  document.getElementById("messageInput");

const sendBtn =
  document.getElementById("sendBtn");

const refreshBtn =
  document.getElementById("refreshBtn");


/* =====================================
   SOZLAMALAR
===================================== */

const BOTTLE_WAIT = 10;
const CHOICE_WAIT = 10;
const SPIN_TIME = 3000;


/*
  Stol bo'yicha navbat:

  0 → 1 → 2 → 3 → 4 → 5 → 0

  Ya'ni soat strelkasi bo'yicha.
*/

let currentPlayer = 0;

let bottleSeconds = BOTTLE_WAIT;

let choiceSeconds = CHOICE_WAIT;

let bottleTimerInterval = null;

let choiceTimerInterval = null;

let spinning = false;

let choosing = false;

let rotation = 0;


/* =====================================
   O'YINCHILAR
===================================== */

const playerNames = [
  "Anna",
  "Alex",
  "Maria",
  "John",
  "Sara",
  "Mike"
];

const playerFaces = [
  "👩",
  "👨",
  "👩",
  "👨",
  "👩",
  "👨"
];


/* =====================================
   NAVBAT
===================================== */

function updateTurn() {

  players.forEach((player, index) => {

    player.classList.toggle(
      "active",
      index === currentPlayer
    );

  });

  turnText.textContent =
    "Navbat: " +
    playerNames[currentPlayer];
}


/* =====================================
   CHAT SYSTEM XABARI
===================================== */

function systemMessage(text) {

  const div =
    document.createElement("div");

  div.className =
    "system-message";

  div.textContent = text;

  messages.appendChild(div);

  messages.scrollTop =
    messages.scrollHeight;
}


/* =====================================
   BUTILKA TAYMERI
===================================== */

function startBottleTimer() {

  clearInterval(bottleTimerInterval);

  bottleSeconds = BOTTLE_WAIT;

  bottleTimer.textContent =
    bottleSeconds;

  bottleTimerInterval =
    setInterval(() => {

      if (spinning || choosing) {
        return;
      }

      bottleSeconds--;

      bottleTimer.textContent =
        bottleSeconds;

      if (bottleSeconds <= 0) {

        clearInterval(
          bottleTimerInterval
        );

        systemMessage(
          playerNames[currentPlayer] +
          " 10 soniyada aylantirmadi. Avtomatik aylantirilmoqda."
        );

        spinBottle(true);
      }

    }, 1000);
}


/* =====================================
   BUTILKANI AYLANISHI
===================================== */

function spinBottle(auto = false) {

  if (spinning || choosing) {
    return;
  }

  spinning = true;

  clearInterval(
    bottleTimerInterval
  );

  bottleTimer.textContent = "🍾";

  if (!auto) {

    systemMessage(
      playerNames[currentPlayer] +
      " butilkani aylantirdi."
    );

  }


  /*
    Har safar kamida 3 marta aylanadi.
    Qo'shimcha aylanish tasodifiy.
  */

  const extra =
    Math.floor(
      Math.random() * 720
    );

  rotation +=
    1080 + extra;

  bottle.style.transform =
    `rotate(${rotation}deg)`;


  setTimeout(() => {

    spinning = false;

    /*
      Butilka qaysi o'yinchiga tushganini
      tasodifiy tanlaymiz.

      O'ziga tushib qolmasligi uchun
      aylantirgan o'yinchi chiqarib tashlanadi.
    */

    let target;

    do {

      target =
        Math.floor(
          Math.random() * players.length
        );

    } while (
      target === currentPlayer
    );


    showKissScreen(
      currentPlayer,
      target
    );

  }, SPIN_TIME);
}


/* =====================================
   O'PISHISH EKRANI
===================================== */

function showKissScreen(
  first,
  second
) {

  choosing = true;

  /*
    Butilka yo'qoladi.
  */

  bottle.classList.add("hidden");

  bottleTimer.style.display =
    "none";


  /*
    Tanlangan 2 o'yinchi markazga chiqadi.
  */

  chosenOne.innerHTML =
    `<span style="font-size:30px">
      ${playerFaces[first]}
    </span>
    <small>${playerNames[first]}</small>`;

  chosenTwo.innerHTML =
    `<span style="font-size:30px">
      ${playerFaces[second]}
    </span>
    <small>${playerNames[second]}</small>`;


  kissScreen.classList.add(
    "show"
  );


  systemMessage(
    playerNames[first] +
    " ❤️ " +
    playerNames[second]
  );


  startChoiceTimer();
}


/* =====================================
   10 SONIYALIK TANLOV
===================================== */

function startChoiceTimer() {

  clearInterval(
    choiceTimerInterval
  );

  choiceSeconds =
    CHOICE_WAIT;

  choiceTimer.textContent =
    choiceSeconds;


  choiceTimerInterval =
    setInterval(() => {

      choiceSeconds--;

      choiceTimer.textContent =
        choiceSeconds;


      if (choiceSeconds <= 0) {

        clearInterval(
          choiceTimerInterval
        );

        /*
          Vaqt tugasa avtomatik Refuse.
        */

        finishChoice(
          "Refuse",
          true
        );
      }

    }, 1000);
}


/* =====================================
   KISS / REFUSE
===================================== */

kissBtn.addEventListener(
  "click",
  () => {

    if (!choosing) {
      return;
    }

    finishChoice(
      "Kiss",
      false
    );

  }
);


refuseBtn.addEventListener(
  "click",
  () => {

    if (!choosing) {
      return;
    }

    finishChoice(
      "Refuse",
      false
    );

  }
);


/* =====================================
   TANLOVNI YAKUNLASH
===================================== */

function finishChoice(
  result,
  automatic
) {

  if (!choosing) {
    return;
  }

  clearInterval(
    choiceTimerInterval
  );

  choosing = false;


  if (automatic) {

    systemMessage(
      "10 soniya tugadi — Refuse."
    );

  } else {

    if (result === "Kiss") {

      systemMessage(
        "💋 Kiss tanlandi!"
      );

    } else {

      systemMessage(
        "✕ Refuse tanlandi."
      );

    }

  }


  /*
    Bir oz natijani ko'rsatib turadi.
  */

  setTimeout(() => {

    kissScreen.classList.remove(
      "show"
    );

    bottle.classList.remove(
      "hidden"
    );

    bottleTimer.style.display =
      "flex";


    /*
      Keyingi navbat soat strelkasi bo'yicha.
    */

    currentPlayer =
      (currentPlayer + 1)
      % players.length;

    updateTurn();

    startBottleTimer();

  }, 1000);
}


/* =====================================
   CHAT
===================================== */

function sendMessage() {

  const text =
    messageInput.value.trim();

  if (!text) {
    return;
  }


  const message =
    document.createElement("div");

  message.className =
    "message";

  message.textContent =
    text;

  messages.appendChild(
    message
  );

  messages.scrollTop =
    messages.scrollHeight;

  messageInput.value = "";

  messageInput.focus();
}


sendBtn.addEventListener(
  "click",
  sendMessage
);


messageInput.addEventListener(
  "keydown",
  event => {

    if (event.key === "Enter") {
      sendMessage();
    }

  }
);


/* =====================================
   REFRESH
===================================== */

refreshBtn.addEventListener(
  "click",
  () => {

    location.reload();

  }
);


/* =====================================
   BOSHLASH
===================================== */

updateTurn();

startBottleTimer();
