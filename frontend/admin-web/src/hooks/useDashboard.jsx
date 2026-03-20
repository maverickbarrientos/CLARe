import { useEffect, useState } from "react";
import { getDashboard } from "../services/dashboardService";

export function useDashboard() {
    const [dashboard, setDashboard] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const response = await getDashboard();
                console.log(response);
                setDashboard(response);
            } catch (error) {
                console.log(error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboard();
    }, []);

    return { dashboard, error, loading };
}