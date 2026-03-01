import { NavLink } from "react-router-dom"
import { CreateUser } from '../../components/CreateUser';

export function NewUser() {

    return (
        <>
            <NavLink to="/users" className="text-left max-w-fit flex gap-2 items-center">
                <button className="border-global rounded-lg items-center py-1 px-2 text-glow"><span className="material-symbols-outlined">arrow_back</span></button>
                <p className="font-heading text-disabled">Back to Users</p>
            </NavLink>

            <div className="text-left flex flex-col gap-2 my-5">
                <p className="text-5xl font-heading">New User</p>
                <p className="text-secondary">Provide the required details to create a new user account.</p>
            </div>

            <CreateUser />
            
        </>
    )

}