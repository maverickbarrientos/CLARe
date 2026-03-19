import { useState } from "react";
import { LabForm } from "./LabForm";
import { useUpdateLab } from "../../hooks/computer_labs/useUpdateLab";
import { Modal } from "../shared/Modal";

export function UpdateLabForm({ computerLab }) {

    const { update, error, loading } = useUpdateLab();
    const [labForm, setLabForm] = useState({
        lab_name: computerLab.lab_name,
        capacity: computerLab.capacity,
        location: computerLab.location
    });

    const handleChange = (e) => {
        setLabForm(prev => ({
            ...prev,
            [e.target.name] : e.target.value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(labForm);
        await update(labForm);
    }

    return (
        
        <div>
            { loading && <Modal type={"loading"} title={"Updating Class"} subTitle={"Please wait while we update class details."} /> }

            <LabForm handleSubmit={handleSubmit} handleChange={handleChange}
                labForm={labForm} loading={loading} submitLabel={"UPDATE"}
            />
        </div>

    )

}