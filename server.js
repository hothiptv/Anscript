const express = require("express");
const app = express();

let currentKey = "";
let expireAt = 0;

function genKey() {
    return "ans-" + Math.random().toString(36).slice(2, 8);
}

function refreshKey() {
    currentKey = genKey();
    expireAt = Date.now() + 60 * 60 * 1000; // 1 giờ
}

refreshKey();
setInterval(refreshKey, 60 * 60 * 1000);

app.get("/key", (req, res) => {
    res.json({
        key: currentKey,
        expire: expireAt
    });
});

app.get("/verify", (req, res) => {
    const { key } = req.query;
    res.json({ valid: key === currentKey });
});

app.listen(3000, () => console.log("API online"));
