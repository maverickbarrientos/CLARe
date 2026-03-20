import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { LabClass } from "@/types";
import { getClass } from "@/services/labClassService";

export function useClass () {

    const { class_id } = useLocalSearchParams();
    const [labClass, setLabClass] = useState<LabClass | null>(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchClass = async () => {
        console.log(typeof Number(class_id));
        try {
            const response = await getClass(Number(class_id));
            setLabClass(response.data);
        } catch (error: any) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchClass()
    }, [class_id]);

    return { labClass, error, loading }

}