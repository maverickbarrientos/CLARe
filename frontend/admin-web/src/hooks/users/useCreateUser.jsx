import { useState } from "react";
import { createUser } from "../../services/userService";

export function useCreateUser() {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const create = async (payload) => {
        setLoading(true)

        try {
            const response = await createUser(payload);
            return response;
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    return { create, error, loading }

}