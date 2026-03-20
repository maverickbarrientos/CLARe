import { useState } from "react";
import { useCreateUser } from "../../hooks/users/useCreateUser";
import { UserForm } from "./UserForm";
import { Modal } from "../shared/Modal";

export function CreateUser () {

    const { create, error, loading } = useCreateUser();
    const [successModalOpen, setSuccessModalOpen] = useState(false);
    const [errorModalOpen, setErrorModalOpen] = useState(false);
    const [form, setForm] = useState({
        user : {
            email : "",
            password : "",
            is_superuser: false
        },
        user_information : {
            first_name : "",
            last_name : "",
            department: ""
        }
    });

    const handleChange = (e, section) => {
        setForm({
            ...form, 
            [section]: {
                ...form[section],
                [e.target.name]: e.target.value
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(form)
        const result = await create(form);

        if (result.status === 200) {
            setSuccessModalOpen(true)
        } 

        if (error) {
            setErrorModalOpen(true);
        }
    }

    return (
        <div>
            { loading && <Modal type={"loading"} title={"Creating User"} subTitle={"Please wait while we create the user account."} /> }
            { successModalOpen && <Modal type={"success"} title={"Success"} subTitle={"User account has been created successfully."} onClose={() => setSuccessModalOpen(false)} /> }
            { errorModalOpen && <Modal type={"error"} title={"Something went wrong"} subTitle={"Failed to process user request. Please try again."} onClose={() => setErrorModalOpen(false)} /> }
            <UserForm form={form} handleChange={handleChange} onSubmit={handleSubmit} loading={loading} submitLabel="Create" />
        </div>
    )

}