const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// MongoDB
mongoose.connect("mongodb+srv://JustinCheong:stampylongnose334@cluster0.7l6v8u2.mongodb.net/portfolioDB?retryWrites=true&w=majority&appName=Cluster0")
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log(err));

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

const Contact = mongoose.model("Contact", contactSchema);

// Home
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// POST (save data)
app.post("/submit", async (req, res) => {
    try {
        const newContact = new Contact(req.body);
        await newContact.save();
        res.json({ success: true });
    } catch (err) {
        res.status(500).send("Error saving data");
    }
});

// GET (fetch all messages)
app.get("/messages", async (req, res) => {
    try {
        const messages = await Contact.find().sort({ date: -1 });
        res.json(messages);
    } catch (err) {
        res.status(500).send("Error fetching data");
    }
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Running on http://localhost:${PORT}`);
});