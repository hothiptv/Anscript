const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

console.log("Server đang chạy tại port 8080...");

let clients = {
    web: null,
    roblox: null
};

wss.on('connection', (ws, req) => {
    // Kiểm tra xem ai đang kết nối dựa trên User-Agent hoặc Header
    const isRoblox = req.headers['user-agent'] && req.headers['user-agent'].includes('Roblox');

    if (isRoblox) {
        clients.roblox = ws;
        console.log("Roblox đã kết nối!");
    } else {
        clients.web = ws;
        console.log("Trình duyệt Web đã kết nối!");
    }

    ws.on('message', (data) => {
        const message = data.toString();
        
        if (ws === clients.web && clients.roblox) {
            // Web gửi -> Roblox nhận
            clients.roblox.send(message);
        } else if (ws === clients.roblox && clients.web) {
            // Roblox gửi -> Web nhận
            clients.web.send(message);
        }
    });

    ws.on('close', () => {
        if (ws === clients.roblox) console.log("Roblox ngắt kết nối.");
        if (ws === clients.web) console.log("Web ngắt kết nối.");
    });
});
