import { useState } from "react";
import { deleteUser } from "../../services/userService";

export function useDeleteUser() {

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const remove = async (id) => {
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