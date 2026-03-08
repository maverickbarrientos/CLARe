import { NavLink } from "react-router-dom"
import { UpdateUserForm } from "../../components/users/UpdateUserForm"
import { useUser } from "../../hooks/users/useUser"
import { SubPageTitle } from "../../components/SubPageTitle";

export function UpdateUser() {

    const { user, loading } = useUser();

    if (loading) return <p>Loading...</p>

    return (
        
        <div>
            <SubPageTitle to="/users" label="Back to Users"
                         title="Edit User"
                         subTitle="Update user account information and access details."/>
    
            <UpdateUserForm user={user} loading={loading} />

        </div>

    )

}