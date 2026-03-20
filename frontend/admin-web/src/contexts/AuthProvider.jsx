import { useState } from "react";
import { AuthContext } from "./AuthContext";
import { login as loginService } from "../services/authService";
import api from "../services/api";

export function AuthProvider({ children }) {

    const [admin, setAdmin] = useState(null);

    const login = async (email, password) => {
        await loginService(email, password);
        const response = await api.get("/me");
        setAdmin(response.data);
    };

    const logout = () => {
        localStorage.removeItem("access_token");
        setAdmin(null);
    };

    return (
        <AuthContext.Provider value={{ admin, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}