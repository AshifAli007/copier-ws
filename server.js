const WebSocket = require('ws');

const port = process.env.PORT || 8080;
const wss = new WebSocket.Server({ port });

wss.on('connection', ws => {
    ws.on('message', message => {
        // Broadcast the message to all connected clients
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    // ws.send('Welcome to the WebSocket server');
});

console.log(`WebSocket server is running on ws://localhost:${port}`);
