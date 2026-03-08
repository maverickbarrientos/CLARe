import { NavLink } from "react-router-dom";
import { useUser } from "../../hooks/users/useUser";
import { useUserReservations } from "../../hooks/users/useUserReservations";
import { formatDateTime } from "../../utils/dateFormatter";
import { SubPageTitle } from "../../components/SubPageTitle";
import { DetailsPanel } from "../../components/shared/DetailsPanel";

export function ViewUser() {

    const { user, error: userError, loading: userLoading } = useUser();
    const { reservations, error: reservationsError, loading: reservationsLoading } = useUserReservations();

    if (userLoading || reservationsLoading) return <p>Loading...</p>
    if (userError || reservationsError) return <p>Error...</p>

    return (
        <div>

            <SubPageTitle to="/users" label="Back to Users" 
                          title={ ` ${user.users_information.first_name} ${user.users_information.last_name}` }
                          subTitle="View user details and associated reservations" />

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
                            <DetailsPanel title="First Name" content={user.users_information.first_name} />
                            <DetailsPanel title="Last Name" content={user.users_information.last_name} />
                        </div>

                        <div className="grid grid-cols-2 gap-5">
                            <DetailsPanel title="Email" content={user.email} />
                            <DetailsPanel title="Department" content={user.users_information.department} />
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