import { useEffect, useState } from "react";
import { getComputerLabs } from "../../services/computerLabService";

export function useComputerLabs() {

    const [computerLabs, setComputerLabs] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchComputerLabs = async () => {
        try {
            const response = await getComputerLabs();
            setComputerLabs(response);
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchComputerLabs();
    }, []);

    return { computerLabs, fetchComputerLabs, error, loading }

}