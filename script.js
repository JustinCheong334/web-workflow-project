// Load messages on page load
window.onload = loadMessages;

// Handle form submission
document.querySelector("form").addEventListener("submit", async function(e) {
    e.preventDefault();

    const formData = {
        name: document.querySelector('input[name="name"]').value,
        email: document.querySelector('input[name="email"]').value,
        message: document.querySelector('textarea[name="message"]').value
    };

    const res = await fetch("/submit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    });

    const data = await res.json();

    if (data.success) {
        alert("✅ Message Sent!");
        document.querySelector("form").reset();
        loadMessages(); // 🔥 refresh messages
    } else {
        alert("❌ Error sending message");
    }
});

// Load messages function
async function loadMessages() {
    const res = await fetch("/messages");
    const messages = await res.json();

    const container = document.getElementById("messages-container");

    container.innerHTML = "";

    messages.forEach(msg => {
        const div = document.createElement("div");
        div.classList.add("project-card");

        div.innerHTML = `
            <h3>${msg.name}</h3>
            <p>${msg.message}</p>
            <span class="project-tag">${msg.email}</span>
        `;

        container.appendChild(div);
    });
}