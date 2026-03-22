import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const authApi = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type" : "application/x-www-form-urlencoded"
    },
});

export default authApi