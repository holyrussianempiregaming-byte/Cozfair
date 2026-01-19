const WebSocket = require("ws");

// Use Railway/Render's assigned port OR fallback to 3000 locally
const PORT = process.env.PORT || 3000;
const wss = new WebSocket.Server({ port: PORT });

console.log(`WebSocket server running on port ${PORT}`);

wss.on("connection", ws => {
  console.log("New client connected");

  ws.on("message", message => {
    console.log(`Received: ${message}`);

    // Broadcast to everyone
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});