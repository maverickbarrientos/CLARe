import { useState } from "react";
import { createClass } from "../../services/labClassService";

export function useCreateClass () {

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const create = async (payload) => {
        setLoading(true)
        try {
            const response = await createClass(payload);
            return response.data
        } catch (error) {
            console.log(error.response?.data?.detail);
            setError(error)
        } finally {
            setLoading(false);
        }
    }

    return {create, error, loading}

}