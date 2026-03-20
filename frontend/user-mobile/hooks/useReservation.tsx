import { useCallback, useEffect, useState } from "react";
import { getReservation, getUserReservation } from "@/services/reservationService";
import { ReservationWithComputerLab } from "@/types";
import { useSocket } from "./useSocket";
import { useFocusEffect } from "expo-router";

export function useReservation (id?: number) {
    
    const { socketio, isConnected } = useSocket();
    const [reservation, setReservation] = useState<ReservationWithComputerLab | null>(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchReservation = async () => {

        try {

            if (id) {
                const response = await getReservation(id);
                setReservation(response);
            } else {
                const response = await getUserReservation();
                setReservation(response);    
            }
            
        } catch (error: any) {
            setError(error)
        } finally {
            setLoading(false);
        }

    }

    useFocusEffect(
        useCallback(() => {
            fetchReservation();
        }, [id])
    );

    useEffect(() => {
        if (!isConnected) return;

        socketio.on("reservation_status_update", (data: ReservationWithComputerLab) => {
            if (data.id === reservation?.id) {
                setReservation(data);
            }
        });

        socketio.on("new_reservation", (data: ReservationWithComputerLab) => {
            setReservation(data);
        });

        return () => {
            socketio.off("reservation_status_update")
            socketio.off("new_reservation")
        };

    }, [isConnected, reservation?.id]);


    return { reservation, error, loading }

}