import { useState } from "react"
import { useComputerLab } from "../../hooks/computer_labs/useComputerLab"
import { useCreateReservation } from "../../hooks/reservations/useCreateReservation";
import { ReservationForm } from "./ReservationForm"
import { Card } from "../Card";
import { Modal } from "../shared/Modal";

export function CreateReservation () {

    const { create, loading: createLoading } = useCreateReservation();
    const { computerLab, loading: computerLabLoading } = useComputerLab();

    const [form, setForm] = useState({
        user_id: 12,
        lab_id: 0,
        full_name: "",
        department: "",
        email: "",
        reservation_description: "",
        start_date: "",
        end_date: "",
        status: "reserved"
    });

    if (computerLabLoading) return <Modal type={"loading"} title={"Loading Computer Lab"} subTitle={"Please wait while we fetch laboratory data."} />;

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
            { createLoading && <Modal type={"loading"} title={"Creating Reservation"} subTitle={"Please wait while we process your reservation."} /> }
            <div className="text-left w-3/12 my-4">
                <p className="text-xl font-bold font-heading my-2">Computer Lab</p>
                <Card className="text-left p-2 pr-10" cardTitle={computerLab.lab_name}>
                    <p className="font-sans">{ computerLab.location }</p>
                </Card>
            </div>

            <div className="text-left my-4">
                <p className="text-xl font-bold font-heading my-2">Reservation Information</p>
                <ReservationForm handleChange={handleChange} onSubmit={handleSubmit} form={form} />
            </div>
        </div>

    )

}