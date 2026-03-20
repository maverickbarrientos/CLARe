import axios, { AxiosInstance } from 'axios'

const authApi: AxiosInstance = axios.create({
    baseURL: "http://192.168.1.3:8000/",
    headers: { "Content-Type" : "application/x-www-form-urlencoded" },
});

export default authApi