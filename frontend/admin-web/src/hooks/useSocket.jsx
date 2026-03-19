import { useState, useEffect } from "react";
import socketio from "../services/socketio";

export function useSocket() {

    const [isConnected, setConnected] = useState(socketio.connected);

    useEffect(() => {

        const onConnect = () => setConnected(true);
        const onDisconnect = () => setConnected(false);

        socketio.connect();

        socketio.on('connect', onConnect);
        socketio.on('disconnect', onDisconnect);

        return () => {
            socketio.off('connect', onConnect);
            socketio.off('disconnect', onDisconnect);
        }

    }, []);

    return { socketio, isConnected }

}