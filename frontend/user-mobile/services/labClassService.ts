import api from "./api";

export const getAllClass = async () => {

    const response = await api.get("/user/class");
    return response.data;

}

export const getClass = async ( class_id: number ) => {

    const response = await api.get(`/user/class/${class_id}`);
    return response;

}