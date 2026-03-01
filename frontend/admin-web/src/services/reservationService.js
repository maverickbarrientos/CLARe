import api from "./api";

export const getReservations = async (search = "") => {

    const response = await api.get(`/reservations?search=${search}`);
    return response.data.reservations

}