const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

// ======================
// KEY SYSTEM
// ======================
let currentKey = "";
let expireAt = 0;

function genKey() {
    return "ans-" + Math.random().toString(36).slice(2, 8);
}

function refreshKey() {
    currentKey = genKey();
    expireAt = Date.now() + 60 * 60 * 1000; // 1 giờ
    console.log("New key:", currentKey);
}

refreshKey();
setInterval(refreshKey, 60 * 60 * 1000);

// ======================
// ROUTES
// ======================

// ROOT – để không bị Cannot GET /
app.get("/", (req, res) => {
    res.send("ANSCRIPT API ONLINE");
});

// LẤY KEY (HTML dùng)
app.get("/key", (req, res) => {
    res.json({
        key: currentKey,
        expire: expireAt
    });
});

// ROBLOX VERIFY
app.get("/verify", (req, res) => {
    const { key } = req.query;

    if (!key) {
        return res.json({ valid: false, error: "missing key" });
    }

    const valid = key === currentKey;
    res.json({ valid });
});

app.listen(PORT, () => {
    console.log("API running on port", PORT);
});
