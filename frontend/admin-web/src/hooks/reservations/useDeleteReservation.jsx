import { useState } from "react";
import { useParams } from "react-router-dom";
import { deleteReservation } from "../../services/reservationService";

export function useDeleteReservation () {

    const { reservation_id } = useParams();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const remove = async () => {
        setLoading(true);
        try {
            const response = await deleteReservation(reservation_id);
            return response;
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    return { remove, error, loading }

}