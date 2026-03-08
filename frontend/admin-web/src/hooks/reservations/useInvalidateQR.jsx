import { useState } from "react";
import { invalidateQR } from "../../services/reservationService";

export function useInvalidateQR () {

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const invalidate = async (qr_value) => {

        try {
            const response = await invalidateQR(qr_value);
            window.location.reload();
            return response;
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false)
        }
    }

    return { invalidate, error, loading }

}