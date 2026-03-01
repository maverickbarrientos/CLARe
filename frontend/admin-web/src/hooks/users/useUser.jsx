import { useEffect, useState } from "react";
import { getUser } from "../../services/userService";
import { useParams } from "react-router-dom";

export function useUser () {

    const { id } = useParams();
    const [user, setUser] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await getUser(id);
                console.log(response)
                setUser(response);
            } catch (error) {
                console.log(error);
                setError(error);
            } finally {
                setLoading(false);
            }
        }

        fetchUser()

    }, [id])

    return { user, error, loading }

}