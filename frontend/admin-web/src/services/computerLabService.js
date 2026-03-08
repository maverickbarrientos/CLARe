import api from "./api";

export const getComputerLabs = async () => {

    const response = await api.get("/computer_labs")
    return response.data.computer_labs

}

export const getComputerLab = async (lab_id) => {

    const response = await api.get(`/computer_lab/${lab_id}`)
    return response.data.computer_lab

}