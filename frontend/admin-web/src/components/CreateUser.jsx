import { useState } from "react";
import { useCreateUser } from "../hooks/users/useCreateUser";
import { UserForm } from "./UserForm";

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

    return <UserForm form={form} handleChange={handleChange} onSubmit={handleSubmit} loading={loading} submitLabel="Create" />

}