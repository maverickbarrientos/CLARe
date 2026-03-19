import { useState } from "react";
import { useLabClasses } from "./useLabClasses";

const DAYS_MAP = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

function getMonday(date) {
    const d = new Date(date);
    const day = d.getDay();
    d.setDate(d.getDate() - day + (day === 0 ? -6 : 1));
    d.setHours(0, 0, 0, 0);
    return d;
}

export function useWeeklyClass() {
    const { allClass: classes } = useLabClasses();
    const [currentMonday, setCurrentMonday] = useState(() => getMonday(new Date()).getTime());

    const events = classes.map(c => ({
        day: DAYS_MAP.indexOf(c.day.toLowerCase()),
        start: c.start_time.slice(0, 5),
        end: c.end_time.slice(0, 5),
        status: "class"
    }));

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

    return { events, goToNext, goToPrev, currentMonday };
}