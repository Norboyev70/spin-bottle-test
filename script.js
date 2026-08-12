const bottle = document.getElementById("bottle");

const timer = document.getElementById("timer");

const turnText = document.getElementById("turnText");

const players = Array.from(
  document.querySelectorAll(".player")
);

const messages = document.getElementById("messages");

const messageInput =
  document.getElementById("messageInput");

const sendButton =
  document.getElementById("sendButton");


/* =====================================
   O'YIN SOZLAMALARI
===================================== */

const WAIT_TIME = 5;

const SPIN_TIME = 3000;


/*
   O'yinchilar joylashuvi:

   0 = Tepa
   1 = O'ng
   2 = Past
   3 = Chap

   Bu aynan SOAT STRELKASI bo'yicha.
*/

let currentPlayer = 0;

let seconds = WAIT_TIME;

let timerInterval = null;

let spinning = false;

let rotation = 0;


/* =====================================
   NAVBATNI KO'RSATISH
===================================== */

function updateTurn() {

  players.forEach((player, index) => {

    player.classList.toggle(
      "active",
      index === currentPlayer
    );

  });

  const name =
    players[currentPlayer].innerText;

  turnText.innerText =
    "Navbat: " + name;
}


/* =====================================
   CHATGA SYSTEM XABAR
===================================== */

function systemMessage(text) {

  const div =
    document.createElement("div");

  div.className =
    "system-message";

  div.innerText = text;

  messages.appendChild(div);

  messages.scrollTop =
    messages.scrollHeight;
}


/* =====================================
   5 SONIYALIK TAYMER
===================================== */

function startTimer() {

  clearInterval(timerInterval);

  seconds = WAIT_TIME;

  timer.innerText = seconds;

  timerInterval = setInterval(() => {

    if (spinning) {
      return;
    }

    seconds--;

    timer.innerText = seconds;


    if (seconds <= 0) {

      clearInterval(timerInterval);

      systemMessage(
        players[currentPlayer].innerText +
        " vaqtida aylantirmadi. Butilka avtomatik aylanmoqda."
      );

      spinBottle(true);
    }

  }, 1000);
}


/* =====================================
   BUTILKANI AYLANISHI
===================================== */

function spinBottle(auto = false) {

  if (spinning) {
    return;
  }

  spinning = true;

  clearInterval(timerInterval);

  timer.innerText = "🍾";


  if (!auto) {

    systemMessage(
      players[currentPlayer].innerText +
      " butilkani aylantirdi."
    );

  }


  /*
     Har aylanishda tasodifiy qo'shimcha
     aylanish qo'shamiz.
  */

  const extra =
    Math.floor(
      Math.random() * 720
    );

  rotation += 1080 + extra;


  /*
     Butilka markazidan aylanadi.
  */

  bottle.style.transform =
    `rotate(${rotation}deg)`;


  /*
     3 soniya kutamiz.
  */

  setTimeout(() => {

    spinning = false;


    /*
       Keyingi o'yinchi:
       Tepa → O'ng → Past → Chap → Tepa
    */

    currentPlayer =
      (currentPlayer + 1)
      % players.length;


    updateTurn();

    startTimer();

  }, SPIN_TIME);
}


/* =====================================
   BUTILKAGA BOSISH
===================================== */

bottle.addEventListener(
  "click",
  () => {

    /*
       Faqat navbatdagi aylanish paytida
       bosish mumkin.
    */

    if (spinning) {
      return;
    }

    spinBottle(false);

  }
);


/* =====================================
   CHAT
===================================== */

function sendMessage() {

  const text =
    messageInput.value.trim();

  if (!text) {
    return;
  }


  const div =
    document.createElement("div");

  div.className =
    "message";

  div.innerText = text;

  messages.appendChild(div);

  messages.scrollTop =
    messages.scrollHeight;

  messageInput.value = "";

  messageInput.focus();
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


/* =====================================
   O'YINNI BOSHLASH
===================================== */

updateTurn();

startTimer();
