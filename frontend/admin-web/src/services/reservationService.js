import api from "./api";

export const getReservations = async (search = "") => {

    const response = await api.get(`/reservations?search=${search}`);
    return response.data.reservations

}

export const getReservation = async ( reservation_id ) => {

    const response = await api.get(`/reservation/${reservation_id}`);
    return response.data.reservation

}

export const deleteReservation = async ( reservation_id ) => {

    const response = await api.delete(`/delete_reservation/${reservation_id}`)
    return response;

}

export const approveReservation = async ( reservation_id ) => {

    const response = await api.patch(`/reservation/${reservation_id}/approve`);
    return response

}

export const rejectReservation = async ( reservation_id ) => {

    const response = await api.patch(`/reservation/${reservation_id}/reject`);
    return response.data

}


export const invalidateQR = async ( qr_value ) => {

    const response = await api.patch(`/qr_code/${qr_value}/invalidate`)
    return response

}

export const createReservation = async ( payload ) => {

    const response = await api.post(`/custom_reservation/`, payload)
    return response

}

export const approveCancellation = async ( reservation_id ) => {

    const response = await api.patch(`/approve_cancellation/${reservation_id}`);
    return response

}

export const rejectCancellation = async ( reservation_id ) => {

    const response = await api.patch(`/reject_cancellation/${reservation_id}`);
    return response.data

}

export const updateReservation = async ( payload, reservation_id ) => {

    const response = await api.patch(`/update_reservation/${reservation_id}`, payload);
    return response;

}

export const getWeeklyEvents = async (startOfWeek) => {
    console.log("YOOOOOOOOOOOOOOOO", startOfWeek);
    const response = await api.get(`/weekly_events?start_of_week=${startOfWeek}`);
    return response.data;
}