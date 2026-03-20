import api from "./api";

export const getUserReservation = async () => {

    const response = await api.get(`/user/`);
    return response.data;

}
export const getReservation = async (reservationId: number) => {

    const response = await api.get(`/user/reservation/${reservationId}`);
    return response.data;

}

export const createReservation = async ({lab_id, reservation_description, start_date, end_date } : any) => {

    const response = await api.post("/user/create_reservation", {lab_id, reservation_description, start_date, end_date });
    return response.data

}

export const updateReservation = async (reservation_id: any, {lab_id, reservation_description, start_date, end_date}: any) => {

    const response = await api.patch(`/user/update_reservation/${reservation_id}`, {lab_id, reservation_description, start_date, end_date });
    return response.data;

}

export const cancelReservation = async (payload: any) => {

    const response = await api.post(`/user/request_cancellation`, payload);
    return response.data;

}

export const getUserReservations = async () => {

    const response = await api.get(`/user/user_reservations`)
    return response;

}