import { useState } from "react";
import { deleteUser } from "../../services/userService";

export function useDeleteUser() {

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const remove = async (id) => {
        setLoading(true);
        try{
            const response = await deleteUser(id);
            return response
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false)
        }
    };

    return { remove, error, loading };

}