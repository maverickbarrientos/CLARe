import { useState } from "react";
import { useParams } from "react-router-dom";
import { approveReservation, rejectReservation } from "../../services/reservationService";

export function useStatusUpdate () {

    const { reservation_id } = useParams();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const updateStatus = async (status) => {

        try {

            switch (status) {
                case "approve":
                    await approveReservation(reservation_id);
                    break;
                case "reject":
                    await rejectReservation(reservation_id);
                    break;
            }
            window.location.reload();
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false);
        }

    }

    return { updateStatus, error, loading };

}