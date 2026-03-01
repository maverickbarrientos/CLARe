import { useState, useEffect, useRef } from "react";
import { getUsers } from "../../services/userService";

export function useUsers() {

    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const isInitialLoad = useRef(true);

    const fetchUsers = async () => {
        if (isInitialLoad.current) setLoading(true)
        try {
            const response = await getUsers(search);
            setUsers(response);
        } catch (error) {
            setError(error);
            console.log(error);
        } finally {
            setLoading(false);
            isInitialLoad.current = false;
        }
    }

    useEffect(() => {
        const delay = setTimeout(() => {
            fetchUsers();
        }, 500);

        return () => clearTimeout(delay);
    }, [search]);
    
    return { users, search, setSearch, fetchUsers, error, loading }

}