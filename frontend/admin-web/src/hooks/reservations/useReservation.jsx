import { useEffect, useState } from "react";
import { getReservation } from "../../services/reservationService";
import { useParams } from "react-router-dom";
import { useSocket } from "../useSocket";

export function useReservation () {

    const { reservation_id } = useParams();
    const { socketio, isConnected } = useSocket();
    const [reservation, setReservation] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchReservation = async () => {

        try {
            const response = await getReservation(reservation_id);
            console.log(response);
            setReservation(response); 
        } catch (error) {
            console.log(error);
            setError(error);
        } finally {
            setLoading(false);
        }

    }

    useEffect(() => {
        fetchReservation();
    }, [reservation_id]);

    useEffect(() => {
        if (!isConnected) return;
        socketio.on("reservation_status_update", (reservation) => {
            setReservation(reservation);
        });
    }, [isConnected])

    return { reservation, fetchReservation, error, loading };

}