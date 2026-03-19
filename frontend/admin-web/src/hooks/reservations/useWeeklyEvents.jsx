import { useState, useEffect } from "react";
import { getWeeklyEvents } from "../../services/reservationService"

function getMonday(date) {
    const d = new Date(date);
    const day = d.getDay();
    d.setDate(d.getDate() - day + (day === 0 ? -6 : 1));
    d.setHours(0, 0, 0, 0);
    return d;
}

function toDateString(date) {
    return new Date(date).toISOString().split("T")[0];
}

export function useWeeklyEvents() {

    const [currentMonday, setCurrentMonday] = useState(() => getMonday(new Date()).getTime());
    const [events, setEvents] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const DAYS_MAP = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

    const fetchEvents = async (monday) => {
        setLoading(true);
        try {
            const response = await getWeeklyEvents(toDateString(new Date(monday)));
            console.log(response);
            
            const mapped = [
                ...response.reservations.map(r => ({
                    day: new Date(r.start_date).getDay() === 0 ? 6 : new Date(r.start_date).getDay() - 1,
                    start: new Date(r.start_date).toTimeString().slice(0, 5),
                    end: new Date(r.end_date).toTimeString().slice(0, 5),
                    status: r.status
                })),
                ...response.classes.map(c => ({
                    day: DAYS_MAP.indexOf(c.day),
                    start: c.start_time.slice(0, 5),
                    end: c.end_time.slice(0, 5),
                    status: "class"
                }))
            ];
            console.log("MAPPED EVENTS", mapped);
            setEvents(mapped);
        } catch (error) {
            console.log("ERROR", error);
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchEvents(currentMonday);
    }, [currentMonday]);

    const goToPrev = () => setCurrentMonday(prev => {
        const d = new Date(prev);
        d.setDate(d.getDate() - 7);
        return d.getTime(); // ← return timestamp
    });

    const goToNext = () => setCurrentMonday(prev => {
        const d = new Date(prev);
        d.setDate(d.getDate() + 7);
        return d.getTime(); // ← return timestamp
    });

    return { events, currentMonday, goToPrev, goToNext, error, loading };

}