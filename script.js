const bottleButton = document.getElementById("bottleButton");
const bottle = document.querySelector(".bottle");

const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");
const messages = document.getElementById("messages");

let spinning = false;


/* =========================
   BOTTLE
========================= */

bottleButton.addEventListener("click", () => {

    if (spinning) return;

    spinning = true;

    bottle.classList.add("spinning");

    bottle.addEventListener(
        "animationend",
        () => {

            bottle.classList.remove("spinning");

            spinning = false;

        },
        { once: true }
    );

});


/* =========================
   CHAT
========================= */

function sendMessage(text) {

    text = text.trim();

    if (!text) return;


    const message = document.createElement("div");

    message.className = "message own";

    message.innerHTML = `
        <div class="message-avatar">
            <img src="https://i.pravatar.cc/60?img=12" alt="">
        </div>

        <div class="message-text">
            <strong>Norbek</strong>
            <p>${escapeHTML(text)}</p>
        </div>
    `;

    messages.appendChild(message);

    messages.scrollTop = messages.scrollHeight;

    messageInput.value = "";
}


function escapeHTML(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
}


sendButton.addEventListener("click", () => {

    sendMessage(messageInput.value);

});


messageInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {

        sendMessage(messageInput.value);

    }

});


/* =========================
   QUICK MESSAGES
========================= */

document.querySelectorAll(".quick button").forEach(button => {

    button.addEventListener("click", () => {

        sendMessage(button.textContent);

    });

});
