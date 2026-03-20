import api from "./api";

export const signup = async ( payload: any ) => {

    const response = await api.post("/auth/register", payload)
    return response.data

}

export const getCurrentUser = async () => {

    const response = await api.get("/user/me")
    return response.data;

}