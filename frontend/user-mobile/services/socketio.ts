import { io } from "socket.io-client"

export const socketio = io("http://192.168.1.3:8000/", {
    autoConnect: false,
    transports: ["websocket"]
});