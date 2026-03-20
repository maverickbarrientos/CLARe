import { useState } from "react";
import { updateReservation } from "@/services/reservationService";

export function useUpdateReservation () {

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const update = async (reservationId: any, payload: any) => {
        try {
            const response = await updateReservation(reservationId, payload);
            return response;
        } catch (error: any) {
            console.log(error.response?.data);
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    return { update, error, loading }

}