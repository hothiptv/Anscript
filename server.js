const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// cho phép dùng file tĩnh
app.use(express.static(__dirname));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get("/getkey", (req, res) => {
    res.json({
        key: "ans-pikxoe",
        expires_in: "1 hour"
    });
});

app.listen(PORT, () => {
    console.log("ANSCRIPT ONLINE");
});
