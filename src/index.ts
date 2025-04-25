import express from 'express';
import http from 'http';
import ServerConfig from './config/serverConfig';
import { Server } from 'socket.io';
import cors from 'cors';
import roomHandler from './handlers/RoomHandlers';

const app = express();
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    }
});

io.on('connection', (socket) => {
    console.log('New user connected');
    roomHandler(socket);
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(ServerConfig.PORT, () => {
    console.log(`Server is running on port ${ServerConfig.PORT}`);
});