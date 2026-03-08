import api from "./api";

export const getReservations = async (search = "") => {

    const response = await api.get(`/reservations?search=${search}`);
    return response.data.reservations

}

export const getReservation = async ( reservation_id ) => {

    const response = await api.get(`/reservation/${reservation_id}`);
    return response.data.reservation

}

export const approveReservation = async ( reservation_id ) => {

    const response = await api.patch(`/reservation/${reservation_id}/approve`);
    return response.data

}

export const rejectReservation = async ( reservation_id ) => {

    const response = await api.patch(`/reservation/${reservation_id}/reject`);
    return response.data

}


export const invalidateQR = async ( qr_value ) => {

    const response = await api.patch(`/qr_code/${qr_value}/invalidate`)
    return response.data

}

export const createReservation = async ( payload ) => {

    const response = await api.post(`/custom_reservation/`, payload)
    return response.data

}