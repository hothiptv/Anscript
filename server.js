const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("ANSCRIPT API ONLINE");
});

app.post("/verify", (req, res) => {
  const { key } = req.body;

  if (key === "ANSCRIPT-TEST") {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
