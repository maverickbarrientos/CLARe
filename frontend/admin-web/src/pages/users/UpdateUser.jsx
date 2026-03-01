import { NavLink } from "react-router-dom"
import { UpdateUserForm } from "../../components/UpdateUserForm"
import { useUser } from "../../hooks/users/useUser"

export function UpdateUser() {

    const { user, loading } = useUser();

    if (loading) return <p>Loading...</p>

    return (
        
        <>
            <NavLink to="/users" className="text-left max-w-fit flex gap-2 items-center">
                <button className="border-global rounded-lg items-center py-1 px-2 text-glow"><span className="material-symbols-outlined">arrow_back</span></button>
                <p className="font-heading text-disabled">Back to Users</p>
            </NavLink>

            <div className="text-left flex flex-col gap-2 my-5">
                <p className="text-5xl font-heading">Edit User</p>
                <p className="text-secondary">Update user account information and access details.</p>
            </div>
    
            <UpdateUserForm user={user} loading={loading} />

        </>

    )

}