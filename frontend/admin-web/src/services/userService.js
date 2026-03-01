import api from "./api";

export const getUsers = async (search = "") => {

    const response = await api.get(`/users?search=${search}`)
    return response.data.users

}

export const getUser = async ( id ) => {

    const response = await api.get(`/user/${id}`)
    return response.data

}

export const getUserReservations = async ( user_id ) => {

    const response = await api.get(`/user_reservations/${user_id}`)
    return response.data

}

export const createUser = async ( payload ) => {

    const response = await api.post("/create_user", payload)
    return response.data

}

export const updateUser = async ( id, payload ) => {

    const response = await api.patch(`/update_user/${id}`, payload);
    return response.data

}

export const deleteUser = async ( id ) => {

    const response = await api.delete(`/delete_user/${id}`)
    return response.data

}