// server.js
const WebSocket = require('ws');
const readline = require('readline');

const wss = new WebSocket.Server({ port: 8080 });

// Tạo giao diện nhập liệu từ Terminal để gửi tin nhắn tới Roblox
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("Server đang chạy tại port 8080...");

wss.on('connection', (ws) => {
    console.log("Roblox đã kết nối!");

    // Khi nhận tin nhắn từ Roblox
    ws.on('message', (message) => {
        console.log(`\n[Roblox gửi]: ${message}`);
        process.stdout.write("Nhập tin nhắn gửi tới Roblox: ");
    });

    // Hàm nhập tin nhắn từ Terminal để gửi đi
    const askMessage = () => {
        rl.question("Nhập tin nhắn gửi tới Roblox: ", (msg) => {
            ws.send(msg); // Gửi tới Roblox
            askMessage();
        });
    };
    askMessage();

    ws.on('close', () => {
        console.log("Roblox đã ngắt kết nối.");
    });
});
