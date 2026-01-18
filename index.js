const WebSocket = require('ws');
const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end('<h1>Anscript Server Online!</h1><p>Giao diện Admin đang chạy trên Neocities.</p>');
});

const wss = new WebSocket.Server({ server });
const port = process.env.PORT || 8080;

let adminClient = null;
let robloxClients = new Set();

wss.on('connection', (ws, req) => {
    // Phân biệt Admin (từ Neocities) và Roblox (từ game)
    const userAgent = req.headers['user-agent'] || '';
    const isRoblox = userAgent.includes('Roblox');

    if (isRoblox) {
        robloxClients.add(ws);
        console.log("🎮 Một người chơi Roblox đã kết nối!");
        if (adminClient && adminClient.readyState === WebSocket.OPEN) {
            adminClient.send("Hệ thống: Có người chơi vừa chạy Script!");
        }
    } else {
        adminClient = ws;
        console.log("💻 Admin đã kết nối từ Web!");
    }

    ws.on('message', (data) => {
        const message = data.toString();
        console.log("Tin nhắn nhận được:", message);

        if (ws === adminClient) {
            // Admin gửi -> Chuyển cho tất cả Roblox
            robloxClients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) client.send(message);
            });
        } else {
            // Roblox gửi -> Chuyển cho Admin
            if (adminClient && adminClient.readyState === WebSocket.OPEN) {
                adminClient.send(message);
            }
        }
    });

    ws.on('close', () => {
        if (ws === adminClient) adminClient = null;
        else robloxClients.delete(ws);
    });
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
