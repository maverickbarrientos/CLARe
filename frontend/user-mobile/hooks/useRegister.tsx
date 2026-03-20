import { signup } from "@/services/userService";
import { useState } from "react";

type FormState = {
  user: {
    email: string
    password: string
  }
  user_information: {
    first_name: string
    last_name: string
    department: string
  }
}

export function useRegister () {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const signUpUser = async (payload: any) => {
        try {
            const response = await signup(payload);
            return response.data
        } catch (error: any) {
            setError(error)
        } finally {
            setLoading(false);
        }
    }

    return { signUpUser, error, loading }

}