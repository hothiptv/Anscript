const WebSocket = require('ws');
const http = require('http');

// Tạo server để Railway không báo lỗi "Upgrade Required"
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('AN SERVER IS ALIVE');
});

const wss = new WebSocket.Server({ server });

let admin = null;
let players = new Set();

wss.on('connection', (ws) => {
    // Tự động phân loại: Ai kết nối trước thường là Admin (hoặc dựa vào tin nhắn đầu tiên)
    ws.on('message', (data) => {
        const msg = data.toString();
        
        // Logic: Nếu tin nhắn bắt đầu bằng [ADMIN] thì gán là Admin
        if (msg.includes("[ADMIN]")) {
            admin = ws;
            // Gửi cho tất cả người chơi trong game
            players.forEach(p => {
                if (p.readyState === WebSocket.OPEN) p.send(msg);
            });
        } else {
            // Nếu là người chơi gửi -> Chuyển về cho Admin xem
            if (admin && admin.readyState === WebSocket.OPEN) {
                admin.send(msg);
            }
            // Đồng thời lưu ws này vào danh sách người chơi
            players.add(ws);
        }
    });

    ws.on('close', () => {
        if (ws === admin) admin = null;
        else players.delete(ws);
    });
});

server.listen(process.env.PORT || 8080);
