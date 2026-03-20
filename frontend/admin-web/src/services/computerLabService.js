import api from "./api";

export const getComputerLabs = async () => {

    const response = await api.get("/computer_labs")
    return response.data.computer_labs

}

export const getComputerLab = async (lab_id) => {

    const response = await api.get(`/computer_lab/${lab_id}`)
    return response.data.computer_lab

}

export const createLab = async (payload) => {

    const response = await api.post("/create_lab", payload)
    return response.data

}

export const updateLab = async (payload, lab_id) => {

    const response = await api.patch(`/update_lab/${lab_id}`, payload);
    return response.data

}

export const deleteLab = async (lab_id) => {

    const response = await api.delete(`/delete_lab/${lab_id}`);
    return response

}

export const getComputerLabAnalytics = async () => {
    const response = await api.get("/computer_labs/analytics");
    return response.data;
};