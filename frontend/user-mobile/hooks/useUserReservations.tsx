import { useState, useEffect } from "react";
import { getUserReservations } from "@/services/reservationService";
import { ReservationWithComputerLab } from "@/types";

export function useUserReservations() {

    const [userReservations, setUserReservations] = useState<ReservationWithComputerLab[]>([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    const fetchUserReservations = async () => {

        setLoading(true);
        try {
            const response = await getUserReservations();
            setUserReservations(response.data);
        } catch (error: any) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUserReservations();
    }, []);

    return { userReservations, error, loading }

}