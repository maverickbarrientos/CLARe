import { useState } from "react";
import { updateReservation } from "../../services/reservationService";
import { useParams } from "react-router-dom";

export function useUpdateReservation () {

    const { reservation_id } = useParams();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const update = async (payload) => {
        setLoading(true);
        try {
            const response = await updateReservation(payload, reservation_id);
            return response
        } catch (error) {
            console.log(error);
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    return { update, error, loading }

}