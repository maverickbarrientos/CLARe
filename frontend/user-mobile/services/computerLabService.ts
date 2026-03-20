import api from "./api";
import { ComputerLab, Reservation } from "@/types";

const getTodayReservation = (reservations: Reservation[]) => {
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
  const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);

  return reservations.find(r => {
    const startDate = new Date(r.start_date);
    return startDate >= startOfDay && startDate <= endOfDay;
  }) ?? null;
}

export const getComputerLabsWithTodayReservation  = async () => {
  const response = await api.get(`/user/computer_labs`);
  
  return response.data.map((lab: ComputerLab) => ({
    ...lab,
    todayReservation: getTodayReservation(lab.reservations)
  }));
}

export const getComputerLab = async (lab_id: number) => {

  const response = await api.get(`/user/computer_lab/${lab_id}`)
  return response.data

}