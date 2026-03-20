import { getAllClass } from "@/services/labClassService";
import { useEffect, useState } from "react";
import { LabClass } from "@/types";

export function useLabClass () {

    const [labClass, setLabClass] = useState<LabClass[]>([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchClasses = async () => {
        setLoading(true);
        try {
            const response = await getAllClass();
            setLabClass(response);
        } catch (error: any) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchClasses();
    }, []);

    return { labClass, error, loading }

}