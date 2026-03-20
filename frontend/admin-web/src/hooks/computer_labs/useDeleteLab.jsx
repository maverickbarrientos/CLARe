import { useState } from "react";
import { useParams } from "react-router-dom";
import { deleteLab } from "../../services/computerLabService";

export function useDeleteLab () {

    const { lab_id } = useParams();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const remove = async () => {
        setLoading(true);
        try {
            const response = await deleteLab(lab_id);
            return response;
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    return { remove, error, loading }
    
}