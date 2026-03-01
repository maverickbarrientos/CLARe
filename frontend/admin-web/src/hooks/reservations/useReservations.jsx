import { useEffect, useState, useRef } from "react";
import { getReservations } from "../../services/reservationService";

export function useReservations() {

    const [reservations, setReservations] = useState([]);
    const [search, setSearch] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const isInitialLoad = useRef(true);

    const fetchReservations = async () => {
        if (isInitialLoad.current) setLoading(true)
        try {
            const response = await getReservations(search);
            setReservations(response)
            console.log(response)
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false);
            isInitialLoad.current = false;
        }
    }

    useEffect(() => {
        const delay = setTimeout(() => {
            fetchReservations()
        }, 500);

        return () => clearTimeout(delay)
    }, [search])

    return { reservations, search, setSearch, error, loading }

}