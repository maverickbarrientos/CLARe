import { useEffect, useState } from "react";
import { getComputerLabAnalytics } from "../../services/computerLabService";

export function useComputerLabAnalytics() {
    const [analytics, setAnalytics] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const response = await getComputerLabAnalytics();
                console.log(response);
                setAnalytics(response);
            } catch (error) {
                console.log(error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchAnalytics();
    }, []);

    return { analytics, error, loading };
}