import { Server } from 'ws';

export default function handler(req, res) {
    if (!res.socket.server.ws) {
        console.log('Starting WebSocket server...');
        const wsServer = new Server({ noServer: true });
        res.socket.server.ws = wsServer;

        res.socket.server.on('upgrade', (req, socket, head) => {
            wsServer.handleUpgrade(req, socket, head, (ws) => {
                wsServer.emit('connection', ws, req);
            });
        });

        wsServer.on('connection', (ws) => {
            ws.on('message', (message) => {
                wsServer.clients.forEach((client) => {
                    if (client.readyState === ws.OPEN) {
                        client.send(message);
                    }
                });
            });
        });
    }
    res.end();
}