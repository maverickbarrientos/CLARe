import { createContext, useEffect, useState } from "react";
import { useSocket } from "../hooks/useSocket";
import { QRModal } from "../components/QRModal";

const QRCodeContext = createContext();

export function QRProvider ({ children }) {

    const [reservation, setReservation] = useState({});
    const [isModalOpen, setModalOpen] = useState(false);
    const { socketio, isConnected } = useSocket();

    useEffect(() => {
        socketio.on("reservation_update", (data) => {
            if (!isConnected) return;

            console.log("HAHAHHAHAHA", data);
            if (data.reservations.status === "in_use") {
                setReservation(data);
                setModalOpen(true);
            }
        });

        return () => socketio.off("reservation_update");

    }, [isConnected])

    return (
        <QRCodeContext.Provider value={{reservation, isModalOpen, setModalOpen}}>
            {children}
            { isModalOpen && <QRModal reservation={reservation} /> }
        </QRCodeContext.Provider>
    )
}

export { QRCodeContext }