import { socketio } from "@/services/socketio";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function useSocket () {

    const [isConnected, setIsConnected] = useState(socketio.connected);

    useEffect(() => {
        
        const onConnect = () => setIsConnected(true);
        const onDisconnect = () => setIsConnected(false);

        socketio.connect();

        socketio.on("connect", async () => {
            const token = await AsyncStorage.getItem("access_token");
            socketio.emit("authenticate", { token });
            setIsConnected(true);
        });
        socketio.on("disconnect", onDisconnect);

        return () => {            
            socketio.off("connect", onConnect);
            socketio.off("disconnect", onDisconnect);
        }

    }, [isConnected]);

    return { socketio, isConnected }

}