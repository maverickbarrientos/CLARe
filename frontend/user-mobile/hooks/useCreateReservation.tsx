import { createReservation } from "@/services/reservationService";
import { useState } from "react";

export function useCreateReservation () {

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const create = async (payload : any) => {
        try {
            const response = await createReservation(payload);
            return response;
        } catch (error : any) {
            setError(error);
        } finally {
            setLoading(false)
        }
    }

    return { create, error, loading };

}