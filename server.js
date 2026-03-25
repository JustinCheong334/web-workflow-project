const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

// Middleware (to read form data)
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// 🔗 CONNECT TO MONGODB ATLAS (non-SRV string)
mongoose.connect("mongodb://JustinCheong:stampylongnose334@ac-admyvf7-shard-00-00.7l6v8u2.mongodb.net:27017,ac-admyvf7-shard-00-01.7l6v8u2.mongodb.net:27017,ac-admyvf7-shard-00-02.7l6v8u2.mongodb.net:27017/portfolioDB?ssl=true&replicaSet=atlas-9hcugh-shard-0&authSource=admin&retryWrites=true&w=majority")
.then(() => console.log("✅ MongoDB Connected Successfully"))
.catch(err => console.log("❌ MongoDB Connection Error:", err));

// 📦 Schema
const userSchema = new mongoose.Schema({
    name: String
});

// 📂 Model
const User = mongoose.model("User", userSchema);

// 🏠 Serve HTML
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// 📥 Handle form submission
app.post("/submit", async (req, res) => {
    try {
        const newUser = new User({
            name: req.body.name
        });

        await newUser.save();

        res.send("✅ Data saved successfully!");
    } catch (error) {
        console.log(error);
        res.send("❌ Error saving data");
    }
});

// 🚀 Dynamic Port for Render
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});