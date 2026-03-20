import { getComputerLabsWithTodayReservation  } from "@/services/computerLabService"
import { useEffect, useState } from "react"
import { ComputerLab } from "@/types"


export function useComputerLabs () {

    const [computerLabs, setComputerLabs] = useState<ComputerLab[]>([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchComputerLabs = async () => {
        try {
            const response = await getComputerLabsWithTodayReservation();
            console.log(response);
            setComputerLabs(response);
        } catch (error: any) {
            setError(error)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchComputerLabs();
    }, []);

    return { computerLabs, error, loading }

}