import { NavLink } from "react-router-dom"
import { CreateUser } from '../../components/users/CreateUser';
import { SubPageTitle } from "../../components/SubPageTitle";

export function NewUser() {

    return (
        <div>
            
            <SubPageTitle to="/users" label="Back to Users"
                         title="New User"
                         subTitle="Provide the required details to create a new user account."/>
            <CreateUser />
            
        </div>
    )

}