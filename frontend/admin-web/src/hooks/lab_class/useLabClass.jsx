import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getClass } from "../../services/labClassService";

export function useLabClass () {

    const { class_id } = useParams();
    const [labClass, setLabClass] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchClass = async () => {
        try {
            const response = await getClass(class_id);
            console.log(response);
            setLabClass(response);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchClass();
    }, [class_id]);

    return { labClass, error, loading }

}