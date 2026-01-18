const WebSocket = require('ws');
const http = require('http');

// 1. Tạo Server HTTP
const server = http.createServer((req, res) => {
    // Khi bạn vào link bằng trình duyệt, nó sẽ hiện trang này thay vì báo lỗi
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end('<h1>Anscript Server đang hoạt động!</h1><p>Vui lòng dùng file HTML Admin để kết nối.</p>');
});

// 2. Tích hợp WebSocket vào Server HTTP
const wss = new WebSocket.Server({ server });

const port = process.env.PORT || 8080;

let webClient = null;
let robloxClients = new Set();

wss.on('connection', (ws, req) => {
    // Kiểm tra xem là Roblox hay trình duyệt
    const userAgent = req.headers['user-agent'] || '';
    const isRoblox = userAgent.includes('Roblox');

    if (isRoblox) {
        robloxClients.add(ws);
        console.log("Roblox kết nối thành công");
        if (webClient) webClient.send("Hệ thống: Một người dùng Roblox vừa kết nối!");
    } else {
        // Nếu không phải Roblox thì coi như là Web Admin
        webClient = ws;
        console.log("Admin kết nối thành công");
    }

    ws.on('message', (data) => {
        const message = data.toString();
        // Nếu Web gửi -> Chuyển cho tất cả Roblox
        if (ws === webClient) {
            robloxClients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) client.send(message);
            });
        } else {
            // Nếu Roblox gửi -> Chuyển về cho Web
            if (webClient && webClient.readyState === WebSocket.OPEN) {
                webClient.send(message);
            }
        }
    });

    ws.on('close', () => {
        if (ws === webClient) webClient = null;
        else robloxClients.delete(ws);
    });
});

// 3. Lắng nghe cổng từ Railway
server.listen(port, () => {
    console.log(`Server online tại port: ${port}`);
});
