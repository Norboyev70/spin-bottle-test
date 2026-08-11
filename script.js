const players = [];

let rotation = 0;

let spinning = false;


/* ELEMENTLAR */

const table =
    document.getElementById("table");

const playersBox =
    document.getElementById("players");

const bottle =
    document.getElementById("bottle");

const spinBtn =
    document.getElementById("spinBtn");

const addPlayerBtn =
    document.getElementById("addPlayerBtn");

const modal =
    document.getElementById("modal");

const playerName =
    document.getElementById("playerName");

const savePlayer =
    document.getElementById("savePlayer");

const closeModal =
    document.getElementById("closeModal");


/* O'YINCHI QO'SHISH OYNASI */

addPlayerBtn.addEventListener("click", () => {

    modal.classList.remove("hidden");

    playerName.value = "";

    playerName.focus();

});


closeModal.addEventListener("click", () => {

    modal.classList.add("hidden");

});


/* O'YINCHI SAQLASH */

savePlayer.addEventListener("click", addPlayer);


playerName.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {

        addPlayer();

    }

});


function addPlayer() {

    const name =
        playerName.value.trim();


    if (name === "") {

        return;

    }


    if (players.length >= 10) {

        alert(
            "Maksimal 10 ta o'yinchi qo'shish mumkin."
        );

        return;

    }


    players.push(name);


    playerName.value = "";


    modal.classList.add("hidden");


    drawPlayers();

}


/* O'YINCHILARNI STOLGA JOYLASHTIRISH */

function drawPlayers() {

    playersBox.innerHTML = "";


    if (players.length === 0) {

        return;

    }


    const width =
        table.clientWidth;

    const height =
        table.clientHeight;


    const centerX =
        width / 2;

    const centerY =
        height / 2;


    const radiusX =
        Math.max(
            90,
            width / 2 - 58
        );


    const radiusY =
        Math.max(
            90,
            height / 2 - 50
        );


    players.forEach((name, index) => {

        const player =
            document.createElement("div");


        player.className =
            "player";


        player.textContent =
            name;


        const angle =
            (Math.PI * 2 * index / players.length)
            - Math.PI / 2;


        const x =
            centerX +
            radiusX *
            Math.cos(angle);


        const y =
            centerY +
            radiusY *
            Math.sin(angle);


        player.style.left =
            x + "px";


        player.style.top =
            y + "px";


        player.dataset.index =
            index;


        playersBox.appendChild(player);

    });

}


/* EKRAN O'ZGARSA */

window.addEventListener(
    "resize",
    drawPlayers
);


/* BUTILKANI AYLANtirish */

spinBtn.addEventListener(
    "click",
    spinBottle
);


function spinBottle() {

    if (spinning) {

        return;

    }


    if (players.length < 2) {

        alert(
            "Avval kamida 2 ta o'yinchi qo'shing."
        );

        return;

    }


    spinning = true;

    spinBtn.disabled = true;


    /* Eski tanlovni olib tashlash */

    document
        .querySelectorAll(".player")
        .forEach(player => {

            player.classList.remove(
                "selected"
            );

        });


    /* Tasodifiy o'yinchi */

    const selected =
        Math.floor(
            Math.random() *
            players.length
        );


    /* Aylanish */

    const turns =
        5 + Math.random() * 3;


    rotation +=
        turns * 360;


    bottle.style.transform =
        `rotate(${rotation}deg)`;


    /* Natija */

    setTimeout(() => {

        const winner =
            document.querySelector(
                `.player[data-index="${selected}"]`
            );


        if (winner) {

            winner.classList.add(
                "selected"
            );

        }


        addMessage(
            "🎯 Butilka " +
            players[selected] +
            " ni tanladi!"
        );


        spinning = false;

        spinBtn.disabled = false;

    }, 3600);

}


/* CHAT */

const chatForm =
    document.getElementById("chatForm");


const chatInput =
    document.getElementById("chatInput");


const messages =
    document.getElementById("messages");


chatForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const text =
            chatInput.value.trim();


        if (text === "") {

            return;

        }


        addMessage(text);


        chatInput.value = "";

    }
);


function addMessage(text) {

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

}
