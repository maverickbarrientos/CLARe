import { NavLink } from "react-router-dom"
import { PageTitle } from "../../components/PageTitle"
import { useUsers } from "../../hooks/users/useUsers"
import { useDeleteUser } from "../../hooks/users/useDeleteUser";

export function Users() {

    const { users, search, setSearch, fetchUsers,error: usersError, loading: usersLoading } = useUsers();
    const { remove, loading: removeLoading } = useDeleteUser();

    const handleDelete = async (id) => {
        await remove(id)
        fetchUsers()
    }

    if (usersLoading) return <p>Loading...</p>
    if (usersError) return <p>{ usersError }</p>

    return (
        <>
            <title>CLARe | Users</title>
            
            <PageTitle pageTitle="Users"/>
            
            <div className="grid grid-cols-2 gap-5 my-5">
                <div className="flex gap-5 justify-self-start">
                    <input type="search" name="search-user" id="search-user" 
                        placeholder="Search User" className="py-2 px-4 rounded-lg border-glow font-sans col-span-1" 
                        value={search} onChange={(e) => setSearch(e.target.value)}/>
                    <button className="border py-2 px-4 rounded-lg font-sans border-glow">Filter</button>
                </div>

                <NavLink to="/new_user" className="col-start-2 justify-self-end">
                    <button className="border py-2 px-4 rounded-lg font-sans">Add User</button>
                </NavLink>
            </div>

            <div className="overflow-x-hidden border rounded-2xl border-glow">
                <table className="w-full text-left [&_th]:p-4 [&_td]:p-4">
                    <thead className="font-bold font-heading border-b-stroke">
                        <tr className="divide-x divide-[#FFB366]">
                            <th>User</th>
                            <th>Department</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y font-sans">
                        { users.map((user) => {

                            return (
                                <tr key={user.id}>
                                    <td className="flex flex-col">
                                        <p>{ `${user.users_information.first_name} ${user.users_information.last_name}` }</p>
                                        <p>{ user.email }</p>
                                    </td>

                                    <td>{ user.users_information.department }</td>
                                    <td>{ user.is_superuser ? "Admin" : "User" }</td>
                                    <td>
                                        <NavLink to={ `/update_user/${user.id}` }><span className="material-symbols-outlined">edit</span></NavLink>
                                        <button onClick={() => {handleDelete(user.id)}} ><span className="material-symbols-outlined">delete</span></button>
                                        <NavLink to={ `/user/${user.id}` }><span className="material-symbols-outlined">visibility</span></NavLink>
                                    </td>
                                </tr>
                            )

                        }) }
                    </tbody>
                </table>
            </div>

            <div className="grid grid-cols-3 my-5">
                <div className="flex col-start-3 justify-end items-center gap-2 font-sans">
                    <button className="px-1 py-2 rounded-md border-glow text-glow font-bold flex items-center justify-center"><span className="material-symbols-outlined">chevron_left</span></button>
                    <p>Page</p>
                    <div className="border p-2 border-glow rounded-md font-bold">
                        <p>1</p>
                    </div>
                    <p>of 7</p>
                    <button className="border-glow px-1 py-2 rounded-md text-glow font-bold flex items-center justify-center"><span className="material-symbols-outlined">chevron_right</span></button>
                </div>
            </div>

        </>
    )

}