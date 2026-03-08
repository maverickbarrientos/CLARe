import { useState } from "react"
import { useComputerLab } from "../../hooks/computer_labs/useComputerLab"
import { useCreateReservation } from "../../hooks/reservations/useCreateReservation";
import { ReservationForm } from "./ReservationForm"
import { Card } from "../Card";

export function CreateReservation () {

    const { create } = useCreateReservation();
    const { computerLab, loading } = useComputerLab();

    const [form, setForm] = useState({
        user_id: 12,
        lab_id: 0,
        full_name: "",
        email: "",
        reservation_description: "",
        start_date: "",
        end_date: "",
        status: "reserved"
    });

    if (loading) return <p>Loading...</p>;

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        create({ ...form, lab_id: computerLab.id })
    }

    return (

        <div>
            <div className="text-left w-3/12 my-4">
                <p className="text-xl font-bold font-heading my-2">Computer Lab</p>
                <Card className="text-left p-2 pr-10" cardTitle={computerLab.lab_name}>
                    <p className="font-sans">{ computerLab.location }</p>
                </Card>
            </div>

            <div className="text-left my-4">
                <p className="text-xl font-bold font-heading my-2">Reservation Information</p>
                <ReservationForm handleChange={handleChange} onSubmit={handleSubmit} />
            </div>
        </div>

    )

}