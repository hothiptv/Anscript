const WebSocket = require('ws');
const http = require('http');

// Tạo một server HTTP cơ bản để "đánh lừa" Railway không báo lỗi
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Anscript Server is Running');
});

const wss = new WebSocket.Server({ server });

const port = process.env.PORT || 8080;

let webClient = null;
let robloxClients = new Set();

wss.on('connection', (ws, req) => {
    const isRoblox = req.headers['user-agent'] && req.headers['user-agent'].includes('Roblox');

    if (isRoblox) {
        robloxClients.add(ws);
        if (webClient) webClient.send("Hệ thống: Một người dùng Roblox vừa kết nối!");
    } else {
        webClient = ws;
        console.log("Admin đã kết nối!");
    }

    ws.on('message', (data) => {
        const message = data.toString();
        if (ws === webClient) {
            robloxClients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) client.send(message);
            });
        } else {
            if (webClient) webClient.send(message);
        }
    });

    ws.on('close', () => {
        if (ws === webClient) webClient = null;
        else robloxClients.delete(ws);
    });
});

// Quan trọng: Phải dùng server.listen thay vì wss.listen
server.listen(port, () => {
    console.log(`Server đang chạy online tại cổng: ${port}`);
});
