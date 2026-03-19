import { useState } from "react";
import { updateUser } from "../../services/userService";

export function useUpdateUser () {

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const update = async (user_id, payload) => {
        setLoading(true);
        try {
            const response = await updateUser(user_id, payload)
            return response
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    return { update, error, loading }

}