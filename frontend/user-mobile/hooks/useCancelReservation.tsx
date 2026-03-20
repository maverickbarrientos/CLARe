
import { useState } from "react";
import { cancelReservation } from "@/services/reservationService";

export function useCancelReservation() {

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const createCancellation = async (payload: any) => {
        setLoading(true);
        try {
            const response = await cancelReservation(payload);
            return response
        } catch (error: any) {
            console.log(error.response?.data.detail);
            setError(error.reponse?.detail);
        } finally {
            setLoading(false);
        }
    }

    return { createCancellation, error, loading };

}