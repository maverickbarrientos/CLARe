import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSocket } from "../useSocket";

export function useStatusUpdate () {

    const { socketio, isConnected } = useSocket();
    const { reservation_id } = useParams();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const updateStatus = async (status, reason="") => {
        if (!isConnected) return;
        setLoading(true);
        try {

            switch (status) {
                case "approve":
                    socketio.emit("approve_reservation", reservation_id)
                    break;
                case "reject":
                    socketio.emit("reject_reservation", reservation_id, reason)
                    break;
                case "approve_cancellation":
                    socketio.emit("approve_cancellation", reservation_id)
                    break;
                case "reject_cancellation":
                    socketio.emit("reject_cancellation", reservation_id, reason)
                    break;
                }
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false);
        }

    }

    return { updateStatus, error, loading };

}