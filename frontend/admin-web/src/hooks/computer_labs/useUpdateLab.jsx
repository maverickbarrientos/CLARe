import { useState } from "react";
import { useParams } from "react-router-dom";
import { updateLab } from "../../services/computerLabService";

export function useUpdateLab () {

    const { lab_id } = useParams();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const update = async (payload) => {
        setLoading(true);
        try {
            const response = await updateLab(payload, lab_id);
            return response
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    return { update, error, loading }

}