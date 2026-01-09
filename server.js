const express = require("express");
const path = require("path");
const app = express();

let currentKey = "";
let expireAt = 0;

function genKey() {
    return "ans-" + Math.random().toString(36).slice(2, 8);
}

function refreshKey() {
    currentKey = genKey();
    expireAt = Date.now() + 60 * 60 * 1000;
}

refreshKey();
setInterval(refreshKey, 60 * 60 * 1000);

// TRANG WEB
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// API GET KEY
app.get("/key", (req, res) => {
    res.json({
        key: currentKey,
        expire: expireAt
    });
});

// API VERIFY
app.get("/verify", (req, res) => {
    const { key } = req.query;
    res.json({ valid: key === currentKey });
});

app.listen(3000, () => console.log("ANSCRIPT API ONLINE"));
