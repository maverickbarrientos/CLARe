import api from "./api"

export const getAllClass = async (day = "") => {
    console.log(day);

    const response = await api.get(`/class?day=${day}`);
    return response.data

}

export const createClass = async (payload) => {


    const response = await api.post(`/create_class`, payload)
    return response;

}

export const getClass = async (class_id) => {

    const response = await api.get(`/class/${class_id}`);
    return response.data;

}   

export const updateClass = async (payload, class_id) => {

    const response = await api.patch(`/update_class/${class_id}`, payload)
    return response;

}