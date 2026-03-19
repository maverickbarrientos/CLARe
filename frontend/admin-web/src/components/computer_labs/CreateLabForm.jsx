import { useState } from "react";
import { LabForm } from "./LabForm";
import { useCreateLab } from "../../hooks/computer_labs/useCreateLab";

export function CreateLabForm() {

    const { create, loading } = useCreateLab();
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
        await create(labForm);
        console.log(labForm);
    }

    return (
        
        <div>
            { loading && <Modal type={"loading"} title={"Creating Laboratory"} subTitle={"Please wait while we create the new computer lab."} /> }
            <LabForm handleSubmit={handleSubmit} handleChange={handleChange}
                labForm={labForm} loading={loading} submitLabel={"CREATE"}
            />
        </div>

    )

}