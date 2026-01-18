const WebSocket = require('ws');
const http = require('http');

// PHẦN 1: TẠO GIAO DIỆN WEB TRỰC TIẾP TRÊN RAILWAY
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    // Đây là toàn bộ giao diện Admin của An
    res.end(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>AN ADMIN HUB</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style>
                body { background: #0a0a0a; color: #bdacff; font-family: sans-serif; display: flex; flex-direction: column; align-items: center; padding: 20px; }
                #chat { width: 100%; max-width: 500px; height: 400px; background: #111; border: 1px solid #333; overflow-y: auto; padding: 10px; border-radius: 10px; margin-bottom: 10px; }
                .input-group { display: flex; gap: 5px; width: 100%; max-width: 500px; }
                input { flex: 1; padding: 12px; background: #222; border: 1px solid #bdacff; color: #fff; border-radius: 8px; outline: none; }
                button { padding: 12px 20px; background: #bdacff; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; color: #000; }
                .msg { margin-bottom: 5px; border-bottom: 1px solid #222; padding-bottom: 5px; font-size: 14px; }
                #status { margin-bottom: 10px; font-size: 12px; font-weight: bold; }
            </style>
        </head>
        <body>
            <h2>AN ADMIN DASHBOARD</h2>
            <div id="status">ĐANG KẾT NỐI...</div>
            <div id="chat"></div>
            <div class="input-group">
                <input type="text" id="inp" placeholder="Nhắn tin tới Roblox...">
                <button onclick="send()">GỬI</button>
            </div>

            <script>
                // Tự động lấy link hiện tại để kết nối WebSocket
                const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
                const socket = new WebSocket(protocol + '//' + window.location.host);
                const chat = document.getElementById('chat');
                
                socket.onopen = () => { document.getElementById('status').innerText = "🟢 SERVER ONLINE"; document.getElementById('status').style.color = "#00ff88"; };
                socket.onmessage = (e) => {
                    let d = document.createElement('div');
                    d.className = "msg";
                    d.innerText = "🎮 " + e.data;
                    chat.appendChild(d);
                    chat.scrollTop = chat.scrollHeight;
                };

                function send() {
                    let val = document.getElementById('inp').value;
                    if(val) {
                        socket.send("[ADMIN]: " + val);
                        let d = document.createElement('div');
                        d.className = "msg";
                        d.style.color = "#fff";
                        d.innerText = "💻 Bạn: " + val;
                        chat.appendChild(d);
                        document.getElementById('inp').value = "";
                    }
                }
            </script>
        </body>
        </html>
    `);
});

// PHẦN 2: XỬ LÝ KẾT NỐI (WEBSOCKET)
const wss = new WebSocket.Server({ server });
let clients = new Set();

wss.on('connection', (ws) => {
    clients.add(ws);
    
    ws.on('message', (data) => {
        const message = data.toString();
        // Phát tin nhắn cho tất cả mọi người (bao gồm cả web và game)
        clients.forEach(client => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on('close', () => {
        clients.delete(ws);
    });
});

server.listen(process.env.PORT || 8080);
