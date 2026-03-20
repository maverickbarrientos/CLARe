import { useState } from "react";
import { LabForm } from "./LabForm";
import { useUpdateLab } from "../../hooks/computer_labs/useUpdateLab";
import { Modal } from "../shared/Modal";

export function UpdateLabForm({ computerLab }) {

    const { update, error, loading } = useUpdateLab();
    const [successModalOpen, setSuccessModalOpen] = useState(false);
    const [errorModalOpen, setErrorModalOpen] = useState(false);
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
        const result = await update(labForm);
        
        if (result.status === 200) {
            setSuccessModalOpen(true)
        } 

        if (error) {
            setErrorModalOpen(true);
        }
    }

    return (
        
        <div>
            { loading && <Modal type={"loading"} title={"Updating Class"} subTitle={"Please wait while we update class details."} /> }
            { successModalOpen && <Modal type={"success"} title={"Success"} subTitle={"Laboratory has been updated successfully."} onClose={() => setSuccessModalOpen(false)} /> }
            { errorModalOpen && <Modal type={"error"} title={"Something went wrong"} subTitle={"Failed to process laboratory request. Please try again."} onClose={() => setErrorModalOpen(false)} /> }

            <LabForm handleSubmit={handleSubmit} handleChange={handleChange}
                labForm={labForm} loading={loading} submitLabel={"UPDATE"}
            />
        </div>

    )

}