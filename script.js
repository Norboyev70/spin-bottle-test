const bottle = document.getElementById("bottle");
const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");
const messages = document.getElementById("messages");

let rotation = 0;
let spinning = false;


/* =========================
   BOTTLE SPIN
========================= */

bottle.addEventListener("click", () => {

    if (spinning) return;

    spinning = true;

    // Har bosganda soat strelkasi bo'yicha
    rotation += 720 + Math.floor(Math.random() * 360);

    bottle.style.transform =
        `rotate(${rotation}deg)`;

    setTimeout(() => {
        spinning = false;
    }, 3000);
});


/* =========================
   CHAT
========================= */

function sendMessage() {

    const text = messageInput.value.trim();

    if (!text) return;

    const message = document.createElement("div");

    message.className = "message";

    message.innerHTML = `
        <img src="https://i.pravatar.cc/80?img=47">

        <div>
            <strong>Aziza 👑</strong>

            <div class="bubble">
                ${escapeHTML(text)}
                <span>Hozir</span>
            </div>
        </div>
    `;

    messages.appendChild(message);

    messages.scrollTop = messages.scrollHeight;

    messageInput.value = "";
}


sendButton.addEventListener("click", sendMessage);


messageInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {
        sendMessage();
    }

});


/* =========================
   SECURITY
========================= */

function escapeHTML(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
}
