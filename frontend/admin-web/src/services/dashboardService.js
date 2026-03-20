import api from "./api";

export const getDashboard = async () => {
    const response = await api.get("/");
    return response.data;
};