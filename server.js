const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

/* ===============================
   TẠO KEY THEO GIỜ (1H ĐỔI 1 LẦN)
================================= */

function getHourSeed() {
    return Math.floor(Date.now() / 3600000);
}

function generateKey() {
    const seed = getHourSeed().toString();
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
        hash = (hash << 5) - hash + seed.charCodeAt(i);
        hash |= 0;
    }
    return "ans-" + Math.abs(hash).toString(36).substring(0, 10);
}

/* ===============================
   API
================================= */

// Trang gốc (fix lỗi Cannot GET /)
app.get("/", (req, res) => {
    res.send("ANSCRIPT KEY SERVER ONLINE");
});

// Get key (HTML dùng)
app.get("/getkey", (req, res) => {
    res.json({
        key: generateKey(),
        expires_in: 3600
    });
});

// Verify key (Roblox Lua dùng)
app.get("/verify", (req, res) => {
    const userKey = req.query.key;
    if (!userKey) {
        return res.json({ success: false, message: "NO_KEY" });
    }

    if (userKey === generateKey()) {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

app.listen(PORT, () => {
    console.log("ANSCRIPT SERVER RUNNING ON PORT", PORT);
});
