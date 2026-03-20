import { useState } from "react"
import { useComputerLab } from "../../hooks/computer_labs/useComputerLab"
import { useCreateClass } from "../../hooks/lab_class/useCreateClass";
import { ClassForm } from "./ClassForm";
import { Card } from "../Card"
import { Modal } from "../shared/Modal";

export function CreateClassForm () {

    const { create, error, loading: createLoading } = useCreateClass();
    const { computerLab, loading: computerLabLoading } = useComputerLab();
    const [successModalOpen, setSuccessModalOpen] = useState(false);
    const [errorModalOpen, setErrorModalOpen] = useState(false);
    const [classForm, setClassForm] = useState({
        lab_id: computerLab.id,
        subject: "",
        department: "",
        section: "",
        teacher: "",
        day: "",
        start_time: "",
        end_time: ""
    });

    if (computerLabLoading) return <Modal type={"loading"} title={"Loading Computer Lab"} subTitle={"Please wait while we fetch laboratory data."} />;

    const handleChange = (e) => {
        setClassForm(prev => ({
            ...prev, 
            [e.target.name] : e.target.value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log({...classForm, lab_id: computerLab.id });
        const result = await create({...classForm, lab_id: computerLab.id});
        
        if (result.status === 200) {
            setSuccessModalOpen(true)
        } 

        if (error) {
            setErrorModalOpen(true);
        }
    }

    return (
        
        <div>
            { createLoading && <Modal type={"loading"} title={"Creating Class"} subTitle={"Please wait while we add the class schedule."} /> }
            { successModalOpen && <Modal type={"success"} title={"Success"} subTitle={"Class schedule has been updated successfully."} onClose={() => setSuccessModalOpen(false)} /> }
            { errorModalOpen && <Modal type={"error"} title={"Something went wrong"} subTitle={"Class schedule has been updated successfully."} onClose={() => setErrorModalOpen(false)} /> }

            <ClassForm classForm={classForm} handleChange={handleChange} handleSubmit={handleSubmit}
                loading={createLoading} submitLabel={"CREATE"}>
                <div className="text-left w-3/12 my-4">
                    <p className="text-xl font-bold font-heading my-2">Computer Lab</p>
                    <Card className="text-left p-2 pr-10" cardTitle={computerLab.lab_name}>
                        <p className="font-sans">{ computerLab.location }</p>
                    </Card>
                </div>
            </ClassForm>
        </div>


    )

}