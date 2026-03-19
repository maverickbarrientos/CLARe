import { NavLink } from "react-router-dom"
import { UpdateUserForm } from "../../components/users/UpdateUserForm"
import { useUser } from "../../hooks/users/useUser"
import { SubPageTitle } from "../../components/SubPageTitle";
import { Modal } from "../../components/shared/Modal";

export function UpdateUser() {

    const { user, loading } = useUser();

    return (
        
        <div>
            <SubPageTitle to="/users" label="Back to Users"
                         title="Edit User"
                         subTitle="Update user account information and access details."/>

            { loading && <Modal type={"loading"} title={"Processing"} subTitle={"Please wait while we fetch user data."} /> }
    
            <UpdateUserForm user={user} />

        </div>

    )

}