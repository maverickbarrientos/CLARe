import { useState } from "react";
import { useSocket } from "../useSocket";

export function useCreateReservation () {

    const { socketio, isConnected } = useSocket();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const create = (payload, { onSuccess, onError } = {}) => {
        if (!isConnected) return;

        setLoading(true);
        setError("");

        socketio.emit("create_reservation", payload);

        socketio.once("reservation_created", () => {
            setLoading(false);
            onSuccess?.();
        });

        socketio.once("reservation_error", (response) => {
            setLoading(false);
            setError(response.message);
            onError?.();
        });
    };

    return { create, error, loading }

}