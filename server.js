const express = require("express");
const app = express();

let unlockExpire = 0;

app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/unlock", (req, res) => {
  unlockExpire = Date.now() + 60 * 60 * 1000; // 1 giờ

  res.json({
    success: true,
    expire: unlockExpire
  });
});

app.get("/check", (req, res) => {
  if (Date.now() < unlockExpire) {
    res.json({ unlocked: true });
  } else {
    res.json({ unlocked: false });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("ANSCRIPT API ONLINE"));
