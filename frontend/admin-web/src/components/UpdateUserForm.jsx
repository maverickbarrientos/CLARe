import { useState } from "react";
import { UserForm } from "./UserForm";
import { updateUser } from "../services/userService";

export function UpdateUserForm ({ user }) {

    const [form, setForm] = useState({
        user : {
            email : user.email,
            is_superuser: user.is_superuser
        },
        user_information : {
            first_name : user.users_information.first_name,
            last_name : user.users_information.last_name,
            department: user.users_information.department
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
        updateUser(user.id, form)
    }

    return <UserForm form={form} handleChange={handleChange} onSubmit={handleSubmit} submitLabel="Update" />

}