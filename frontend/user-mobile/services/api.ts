import axios, { InternalAxiosRequestConfig } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
    baseURL: "http://192.168.1.3:8000/",
    headers: { "Content-Type" : "application/json" }
});

api.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
    const token = await AsyncStorage.getItem("access_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config
});

export default api