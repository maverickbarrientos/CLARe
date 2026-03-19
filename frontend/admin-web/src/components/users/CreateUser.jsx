import { useState } from "react";
import { useCreateUser } from "../../hooks/users/useCreateUser";
import { UserForm } from "./UserForm";
import { Modal } from "../shared/Modal";

export function CreateUser () {

    const { create, loading } = useCreateUser();
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
        await create(form)
    }

    return (
        <div>
            { loading && <Modal type={"loading"} title={"Processing"} subTitle={"Please wait while we process your reservation."} /> }
            <UserForm form={form} handleChange={handleChange} onSubmit={handleSubmit} loading={loading} submitLabel="Create" />
        </div>
    )

}