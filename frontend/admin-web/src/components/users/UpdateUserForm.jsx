import { useState } from "react";
import { UserForm } from "./UserForm";
import { useUpdateUser } from "../../hooks/users/useUpdateUser";
import { Modal } from "../shared/Modal";

export function UpdateUserForm ({ user }) {

    const { update, error, loading } = useUpdateUser();
    const [successModalOpen, setSuccessModalOpen] = useState(false);
    const [errorModalOpen, setErrorModalOpen] = useState(false);
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
        e.preventDefault();
        console.log(form);
        const result = await update(user.id, form);
        console.log(`RESULT`, result);

        if (result.status === 200) {
            setSuccessModalOpen(true)
        } 

        if (error) {
            setErrorModalOpen(true);
        }
    }

    return (
        <div>
            { loading && <Modal type={"loading"} title={"Updating User"} subTitle={"Please wait while we update user information."} /> }
            { successModalOpen && <Modal type={"success"} title={"Success"} subTitle={"User account has been updated successfully."} onClose={() => setSuccessModalOpen(false)} /> }
            { errorModalOpen && <Modal type={"error"} title={"Something went wrong"} subTitle={"Failed to process user request. Please try again."} onClose={() => setErrorModalOpen(false)} /> }
            <UserForm form={form} handleChange={handleChange} onSubmit={handleSubmit} submitLabel="Update" />
        </div>
    )

}