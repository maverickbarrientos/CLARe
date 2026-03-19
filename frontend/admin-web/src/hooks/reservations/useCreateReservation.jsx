import { useState } from "react";
import { useSocket } from "../useSocket";

export function useCreateReservation () {

    const { socketio, isConnected } = useSocket();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const create = async (payload) => {
        if (!isConnected) return;
        
        setLoading(true);
        try {
            socketio.emit('create_reservation', payload)
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    return { create, error, loading }

}