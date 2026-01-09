const express = require("express");
const app = express();

app.use(express.json());

/* TEST SERVER */
app.get("/", (req, res) => {
  res.send("ANSCRIPT API ONLINE");
});

/* VERIFY KEY (ROBLOX GỌI) */
app.post("/verify", (req, res) => {
  const { key, hwid } = req.body;

  if (!key || !hwid) {
    return res.status(400).json({
      success: false,
      message: "Missing key or hwid"
    });
  }

  // ví dụ key hợp lệ
  if (key === "TEST_KEY_ANSCRIPT") {
    return res.json({
      success: true
    });
  }

  return res.json({
    success: false
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("ANSCRIPT API running on port " + PORT);
});
