const express = require("express");
const app = express();

let unlockExpire = 0;

app.use(express.json());
app.use(express.static("public")); // ⚠️ CỰC KỲ QUAN TRỌNG

app.get("/unlock", (req, res) => {
  unlockExpire = Date.now() + 60 * 60 * 1000;
  res.json({ success: true });
});

app.get("/check", (req, res) => {
  res.json({
    unlocked: Date.now() < unlockExpire
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("ANSCRIPT API ONLINE"));
