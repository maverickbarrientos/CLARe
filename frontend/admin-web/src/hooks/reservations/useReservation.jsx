import { useEffect, useState } from "react";
import { getReservation } from "../../services/reservationService";
import { useParams } from "react-router-dom";

export function useReservation () {

    const { reservation_id } = useParams();
    const [reservation, setReservation] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchReservation = async () => {

        try {
            const response = await getReservation(reservation_id);
            setReservation(response); 
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }

    }

    useEffect(() => {
        fetchReservation();
    }, [reservation_id]);

    return { reservation, fetchReservation, error, loading };

}