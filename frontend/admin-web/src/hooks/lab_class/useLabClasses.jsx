import { useState, useEffect } from "react";
import { getAllClass } from "../../services/labClassService";


export function useLabClasses () {

    const [allClass, setAllClass] = useState([]);
    const [classPerDay, setClassPerDay] = useState([]);
    const [todayClasses, setTodayClasses] = useState([]);
    const [error, setError] = useState("");
    const [pageLoading, setPageLoading] = useState(true);
    const [classLoading, setClassLoading] = useState(false);
    const [day, setDay] = useState("monday");
    const TODAY = new Date().toLocaleString("en-US", { weekday: "long" }).toLowerCase();

    const fetchClasses = async (selectedDay) => {
        setClassLoading(true)
        try {
            const response = await getAllClass(selectedDay);
            setClassPerDay(response);
        } catch (error) {
            setError(error);
        } finally {
            setClassLoading(false);
        }
    }

    const fetchTodayClasses = async () => {
        try {
            const response = await getAllClass(TODAY);
            setTodayClasses(response);
        } catch (error) {
            setError(error);
        } finally {
            setPageLoading(false);
        }
    }

    const fetchAllClass = async () => {
        try {
            const response = await getAllClass();
            setAllClass(response);
        } catch (error) {
            console.log(error)
            setError(error);
        }
    }

    useEffect(() => {
        fetchTodayClasses(); 
    }, []);

    useEffect(() => {
        fetchClasses(day);
    }, [day]);

    useEffect(() => {
        fetchAllClass();
    }, [])


    return { classPerDay, allClass, todayClasses, day, setDay, fetchClasses, error, pageLoading, classLoading };

}