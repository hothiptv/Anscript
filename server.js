const express = require("express");
const app = express();

app.use(express.json());

/* TRẢ TRANG WEB */
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

/* API GET KEY */
app.get("/getkey", (req, res) => {
  const key =
    "ANSCRIPT-" +
    Math.random().toString(36).substring(2, 8).toUpperCase();

  res.json({
    success: true,
    key: key
  });
});

/* VERIFY KEY (ROBLOX) */
app.post("/verify", (req, res) => {
  const { key } = req.body;

  if (key && key.startsWith("ANSCRIPT-")) {
    return res.json({ success: true });
  }

  return res.json({ success: false });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("ANSCRIPT SERVER ONLINE");
});
