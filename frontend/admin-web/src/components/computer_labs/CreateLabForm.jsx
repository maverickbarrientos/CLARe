import { useState } from "react";
import { LabForm } from "./LabForm";
import { useCreateLab } from "../../hooks/computer_labs/useCreateLab";
import { Modal } from "../shared/Modal";

export function CreateLabForm() {

    const { create, error, loading } = useCreateLab();
    const [successModalOpen, setSuccessModalOpen] = useState(false);
    const [errorModalOpen, setErrorModalOpen] = useState(false);
    const [labForm, setLabForm] = useState({
        lab_name: "",
        capacity: 0,
        location: ""
    });

    const handleChange = (e) => {
        setLabForm(prev => ({
            ...prev,
            [e.target.name] : e.target.value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await create(labForm);

        if (result.status === 200) {
            setSuccessModalOpen(true)
        } 

        if (error) {
            setErrorModalOpen(true);
        }
    }

    return (
        
        <div>
            { loading && <Modal type={"loading"} title={"Creating Laboratory"} subTitle={"Please wait while we create the new computer lab."} /> }
            { successModalOpen && <Modal type={"success"} title={"Success"} subTitle={"Laboratory has been updated successfully."} onClose={() => setSuccessModalOpen(false)} /> }
            { errorModalOpen && <Modal type={"error"} title={"Something went wrong"} subTitle={"Failed to process laboratory request. Please try again."} onClose={() => setErrorModalOpen(false)} /> }
            <LabForm handleSubmit={handleSubmit} handleChange={handleChange}
                labForm={labForm} loading={loading} submitLabel={"CREATE"}
            />
        </div>

    )

}