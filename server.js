// server.js
const { WebSocketServer } = require('ws');
const http = require('http');

// Create an HTTP server
const server = http.createServer();

// Create a WebSocket server
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
    console.log('New client connected');

    ws.on('message', (message) => {
        console.log(`Received message => ${message}`);
        // Echo the received message back to the client
        ws.send(`You said: ${message}`);
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

// Define the port
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});