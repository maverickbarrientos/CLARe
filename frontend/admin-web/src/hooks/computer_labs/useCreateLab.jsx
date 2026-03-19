import { useState } from "react";
import { createLab } from "../../services/computerLabService";

export function useCreateLab () {

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const create = async (payload) => {
        setLoading(true);

        try {
            const response = await createLab(payload);
            return response
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    return { create, error, loading }

}