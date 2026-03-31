const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // 🔥 IMPORTANT for fetch
app.use(express.static(__dirname));

// MongoDB Connection
mongoose.connect("mongodb+srv://JustinCheong:stampylongnose334@cluster0.7l6v8u2.mongodb.net/portfolioDB?retryWrites=true&w=majority&appName=Cluster0")
.then(() => console.log("✅ MongoDB Connected Successfully"))
.catch(err => console.log("❌ MongoDB Error:", err));

// Schema
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    date: {
        type: Date,
        default: Date.now
    }
});

// Model
const Contact = mongoose.model("Contact", contactSchema);

// Home Route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Submit Form
app.post("/submit", async (req, res) => {
    try {
        const newContact = new Contact({
            name: req.body.name,
            email: req.body.email,
            message: req.body.message
        });

        await newContact.save();

        res.json({ success: true });

    } catch (err) {
        console.log(err);
        res.json({ success: false });
    }
});

// 🔥 NEW ROUTE → GET ALL MESSAGES
app.get("/messages", async (req, res) => {
    try {
        const messages = await Contact.find().sort({ date: -1 });
        res.json(messages);
    } catch (err) {
        res.json([]);
    }
});

// Start Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});