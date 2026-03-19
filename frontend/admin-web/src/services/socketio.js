import { io } from "socket.io-client";

const socketio = io("http://127.0.0.1:8000", {
    autoConnect: false,
    transports: ["websocket"]
})

export default socketio