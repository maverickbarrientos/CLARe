import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUserReservations } from "../../services/userService";

export function useUserReservations() {

    const { id } = useParams();
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        
        const fetchReservations = async () => {
            try {
                const response = await getUserReservations(id);
                console.log(response);
                setReservations(response);
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false)
            }
        }

        fetchReservations()

    }, [id]);

    return { reservations, error, loading }

}