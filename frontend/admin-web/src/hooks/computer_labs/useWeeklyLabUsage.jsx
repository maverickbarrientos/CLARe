import { useState } from "react";
import { useComputerLab } from "./useComputerLab";

const DAYS_MAP = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

function getMonday(date) {
    const d = new Date(date);
    const day = d.getDay();
    d.setDate(d.getDate() - day + (day === 0 ? -6 : 1));
    d.setHours(0, 0, 0, 0);
    return d;
}

export function useWeeklyLabUsage() {
    const { computerLab, loading } = useComputerLab();
    const [currentMonday, setCurrentMonday] = useState(() => getMonday(new Date()).getTime());

    const events = !loading
        ? computerLab.reservations.map(r => ({
            day: new Date(r.start_date).getDay() === 0 ? 6 : new Date(r.start_date).getDay() - 1,
            start: new Date(r.start_date).toTimeString().slice(0, 5),
            end: new Date(r.end_date).toTimeString().slice(0, 5),
            status: r.status
        }))
        : [];

    const goToPrev = () => setCurrentMonday(prev => {
        const d = new Date(prev);
        d.setDate(d.getDate() - 7);
        return d.getTime();
    });

    const goToNext = () => setCurrentMonday(prev => {
        const d = new Date(prev);
        d.setDate(d.getDate() + 7);
        return d.getTime();
    });

    return { events, goToNext, goToPrev, currentMonday, loading };
}