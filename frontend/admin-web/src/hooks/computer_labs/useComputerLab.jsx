import { useState } from "react";
import { getComputerLab } from "../../services/computerLabService";
import { useParams } from "react-router-dom";

export function useComputerLab () {

    const { lab_id } = useParams();
    const [computerLab, setComputerLab] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchComputerLab = async () => {
        try {
            const response = await getComputerLab(lab_id);
            setComputerLab(response);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    useState(() => {
        fetchComputerLab();
    }, [lab_id]);
 
    return { computerLab, fetchComputerLab, error, loading }

}