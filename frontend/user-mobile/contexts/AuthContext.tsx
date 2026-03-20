import React, { createContext, useState } from "react";
import { login as loginService } from "@/services/authService";
import { getCurrentUser } from "@/services/userService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

type AuthContextType = {
    user: {
        id: number;
        email: string;
        is_active: boolean;
        is_superuser: boolean;
        users_information: {
            first_name: string;
            last_name: string;
            department: string;
        }
    } | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider ({children}: { children : React.ReactNode}) {

    const [user, setUser] = useState(null);
    const router = useRouter();

    const login = async(email: string, password: string) => {
        const data = await loginService(email, password);
        const currentUser = await getCurrentUser();
        setUser(currentUser);
    }

    const logout = async () => {
        await AsyncStorage.removeItem("token");
        setUser(null);
        router.push("/");
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}