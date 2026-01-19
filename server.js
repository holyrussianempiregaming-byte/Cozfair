const http = require("http");
const WebSocket = require("ws");

const PORT = process.env.PORT || 3000; // Railway injects the right port

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("🛤️ Cozfair WebSocket server is running.");
});

const wss = new WebSocket.Server({ server });

wss.on("connection", ws => {
  ws.on("message", message => {
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});

server.listen(PORT, () => {
  console.log(`✅ Server listening on port ${PORT}`);
});