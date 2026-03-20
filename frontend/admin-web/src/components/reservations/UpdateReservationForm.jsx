import { useState } from "react"
import { ReservationForm } from "./ReservationForm"
import { useComputerLabs } from "../../hooks/computer_labs/useComputerLabs"
import { useUpdateReservation } from "../../hooks/reservations/useUpdateReservation";
import { Modal } from "../shared/Modal";

export function UpdateReservationForm ({ reservation }) {

    const { update } = useUpdateReservation();
    const { computerLabs, error, loading } = useComputerLabs();
    const [successModalOpen, setSuccessModalOpen] = useState(false);
    const [errorModalOpen, setErrorModalOpen] = useState(false);
    const [reservationForm, setReservationForm] = useState({
        user_id: reservation.user_id,
        lab_id: reservation.lab_id,
        full_name: reservation.full_name,
        department: reservation.department,
        email: reservation.email,
        reservation_description: reservation.reservation_description,
        start_date: reservation.start_date,
        end_date: reservation.end_date,
        status: reservation.status
    });


    const handleChange = (e) => {
        setReservationForm({
            ...reservationForm,
            [e.target.name]: e.target.name === "lab_id" ? parseInt(e.target.value) : e.target.value
        })
    }

    const handleSubmit =  async (e) => {
        e.preventDefault();
        console.log(reservationForm)
        const result = await update(reservationForm);

        if (result.status === 200) {
            setSuccessModalOpen(true)
        } 

        if (error) {
            setErrorModalOpen(true);
        }
    }

    return (

        <div>

            { loading && <Modal type={"loading"} title={"Updating Reservation"} subTitle={"Please wait while we update reservation details."} /> }
            { successModalOpen && <Modal type={"success"} title={ "Success"} subTitle={"Reservation has been updated successfully."} onClose={() => setSuccessModalOpen(false)} /> }
            { errorModalOpen && <Modal type={"error"} title={"Something went wrong"} subTitle={"Failed to update the reservation. Please try again."} onClose={() => setErrorModalOpen(false)} /> }
            <div className="text-left my-4">
                <p className="text-xl font-bold font-heading my-2">Reservation Information</p>
                <ReservationForm handleChange={handleChange} onSubmit={handleSubmit} 
                    form={reservationForm} submitLabel={"UPDATE"}>
                    <div>
                        <p className="font-heading mb-2">Computer Lab</p>
                        <select name="lab_id" onChange={handleChange} value={reservationForm.lab_id}
                            className="py-2 px-4 rounded-lg border-global font-sans w-full bg-black text-white font-heading">
                            { computerLabs.map((computerLab) => {
                                return (
                                    <option value={computerLab.id} key={computerLab.id}>
                                        { `${computerLab.lab_name} - ${computerLab.location}` }
                                    </option>
                                )
                            }) }
                        </select>
                    </div>
                </ReservationForm>
            </div>
        </div>

    )

}