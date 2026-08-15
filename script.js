const bottle = document.getElementById("bottle");

const input = document.getElementById("messageInput");
const send = document.getElementById("sendButton");
const messages = document.getElementById("messages");

let angle = 28;
let spinning = false;


/* =========================
   BUTILKA
========================= */

bottle.addEventListener("click", function () {

    if (spinning) return;

    spinning = true;

    // Faqat o'yinchi bosganda aylanadi
    const extra =
        720 +
        Math.floor(Math.random() * 360);

    angle += extra;

    bottle.style.transform =
        `rotate(${angle}deg)`;

    setTimeout(() => {
        spinning = false;
    }, 2900);
});


/* =========================
   CHAT
========================= */

function sendMessage(){

    const text = input.value.trim();

    if(!text) return;

    const item = document.createElement("div");

    item.className = "msg";

    item.innerHTML = `
        <img src="https://i.pravatar.cc/80?img=47">

        <div>
            <b>Aziza 👑</b>

            <p>
                ${escapeText(text)}
                <time>Hozir</time>
            </p>
        </div>
    `;

    messages.appendChild(item);

    messages.scrollTop =
        messages.scrollHeight;

    input.value = "";
}


send.addEventListener(
    "click",
    sendMessage
);


input.addEventListener(
    "keydown",
    function(e){

        if(e.key === "Enter"){
            sendMessage();
        }

    }
);


/* xavfsiz yozuv */

function escapeText(text){

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
}
