const form = document.getElementById("contactForm");
const messageList = document.getElementById("messageList");

// Load messages on page load
async function loadMessages() {
    const res = await fetch("/messages");
    const data = await res.json();

    messageList.innerHTML = "";

    data.forEach(msg => {
        const div = document.createElement("div");
        div.style.marginBottom = "10px";
        div.style.padding = "10px";
        div.style.border = "1px solid #ccc";

        div.innerHTML = `
            <strong>${msg.name}</strong><br>
            ${msg.email}<br>
            ${msg.message}
        `;

        messageList.appendChild(div);
    });
}

// Handle form submit
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value
    };

    await fetch("/submit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    form.reset();
    loadMessages(); // refresh messages
});

// Initial load
loadMessages();