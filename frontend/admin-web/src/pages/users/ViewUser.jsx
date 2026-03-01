import { NavLink } from "react-router-dom";
import { useUser } from "../../hooks/users/useUser";
import { useUserReservations } from "../../hooks/users/useUserReservations";
import { formatDateTime } from "../../utils/dateFormatter";

export function ViewUser() {

    const { user, error: userError, loading: userLoading } = useUser();
    const { reservations, error: reservationsError, loading: reservationsLoading } = useUserReservations();

    if (userLoading || reservationsLoading) return <p>Loading...</p>
    if (userError || reservationsError) return <p>Error...</p>

    console.log(reservations);

    return (
        <div>
            <NavLink to="/users" className="text-left max-w-fit flex gap-2 items-center">
                <button className="border-global rounded-lg items-center py-1 px-2 text-glow"><span className="material-symbols-outlined">arrow_back</span></button>
                <p className="font-heading text-disabled">Back to Users</p>
            </NavLink>

            <div className="text-left flex flex-col gap-2 my-5">
                <p className="text-5xl font-bold font-heading">{ ` ${user.users_information.first_name} ${user.users_information.last_name}` }</p>
                <p className="text-secondary">View user details and associated reservations</p>
            </div>

            <div>
            <div className="flex flex-col gap-6">
                <div className="text-left">
                    <p className="text-xl font-heading font-bold my-3">User Type</p>

                    <div className="flex gap-4">
                        <label className={`flex items-center gap-2 cursor-pointer border px-4 py-2 rounded-lg font-bold font-heading text-disabled ${user.is_superuser ? "border-glow text-glow" : "border"}`}>
                            <input 
                                type="radio" 
                                name="is_superuser" 
                                value={user.is_superuser}
                                defaultChecked={user.is_superuser === true}
                                hidden={true}
                            />
                            Admin
                        </label>

                        <label className={`flex items-center gap-2 cursor-pointer border px-4 py-2 rounded-lg font-bold font-heading text-disabled ${!user.is_superuser ? "border-glow text-glow" : "border"}`}>
                            <input 
                                type="radio" 
                                name="is_superuser" 
                                value={user.is_superuser}
                                defaultChecked={user.is_superuser === false}
                                hidden={true}
                            />
                            User
                        </label>
                    </div>
                </div>

            <div className="text-left">
                <p className="text-xl font-bold font-heading mb-3">Personal Information</p>
                
                <div className="w-3/4">
                    <div className="grid grid-cols-2 gap-5 mb-5">
                        <div>
                            <p className="font-heading">First Name *</p>
                            <input type="text" name="first_name" className="py-2 px-4 rounded-lg border-global font-sans w-full" 
                                defaultValue={user.users_information.first_name}/>
                        </div>
                        <div>
                            <p className="font-heading">Last Name *</p>
                            <input type="text" name="last_name" className="py-2 px-4 rounded-lg border-global font-sans w-full" 
                                defaultValue={user.users_information.last_name}/>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                        <div>
                            <p className="font-heading">Email *</p>
                            <input type="text" name="email" className="py-2 px-4 rounded-lg border-global font-sans w-full" 
                                defaultValue={user.email}/>
                        </div>
                        
                        <div>
                            <p className="font-heading">Password *</p>
                            <input type="password" name="password" className="py-2 px-4 rounded-lg border-global font-sans w-full" 
                                defaultValue={user.password}/>
                        </div>

                        <div>
                            <p className="font-heading">Department *</p>
                            <input type="text" name="department" className="py-2 px-4 rounded-lg border-global font-sans w-full" 
                                defaultValue={user.users_information.department}/>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>

            <div className="text-left">
                <p className="text-xl font-heading font-bold my-3">User Reservation</p>

                <div className="flex gap-4 overflow-x-auto flex-nowrap">
                    { reservations.length > 0 ?
                        reservations.map((reservation) => {
                            return (
                                <div className="border-glow rounded-2xl p-4 px-7" key={reservation.id}>
                                    <p className="text-xl font-heading font-bold">{ reservation.computer_labs.lab_name }</p>
                                    <p className="font-sans text-xs">{ `${formatDateTime(new Date(reservation.start_date))} - ${formatDateTime(new Date(reservation.end_date))}` }</p>
                                    <p>{ reservation.status.toUpperCase() }</p>
                                </div>
                            )
                        }) : <p>No reservations yet</p>
    
                    }
                </div>
            </div>


        </div>
    )

}