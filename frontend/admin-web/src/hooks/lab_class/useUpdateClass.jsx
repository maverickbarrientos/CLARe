import { useState } from "react";
import { useParams } from "react-router-dom";
import { updateClass } from "../../services/labClassService";

export function useUpdateClass () {

    const { class_id } = useParams();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const update = async (payload) => {
        setLoading(true);
        try {
            const response = await updateClass(payload, class_id);
            return response
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    return { update, error, loading }

}