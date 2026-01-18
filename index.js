const WebSocket = require('ws');
const port = process.env.PORT || 8080;
const wss = new WebSocket.Server({ port });

console.log(`Server đang chạy online tại cổng: ${port}`);

let webClient = null;
let robloxClients = new Set();

wss.on('connection', (ws, req) => {
    // Kiểm tra xem là Web hay Roblox
    const isRoblox = req.headers['user-agent'] && req.headers['user-agent'].includes('Roblox');

    if (isRoblox) {
        robloxClients.add(ws);
        console.log("Một người dùng Roblox đã kết nối!");
        if (webClient) webClient.send("Hệ thống: Một người dùng mới vừa chạy Script!");
    } else {
        webClient = ws;
        console.log("Admin đã kết nối từ trình duyệt Web!");
    }

    ws.on('message', (data) => {
        const message = data.toString();

        if (ws === webClient) {
            // Admin gửi từ Web -> Gửi cho TẤT CẢ máy đang chạy Roblox
            robloxClients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(message);
                }
            });
        } else {
            // Roblox gửi -> Gửi về cho Admin trên Web
            if (webClient && webClient.readyState === WebSocket.OPEN) {
                webClient.send(message);
            }
        }
    });

    ws.on('close', () => {
        if (ws === webClient) {
            webClient = null;
        } else {
            robloxClients.delete(ws);
        }
    });
});
