import { NavLink } from "react-router-dom";
import { useComputerLab } from "../../hooks/computer_labs/useComputerLab"
import { SubPageTitle } from "../../components/SubPageTitle";
import { DetailsPanel } from "../../components/shared/DetailsPanel";
import { ReservationCard } from "../../components/reservations/ReservationCard";
import { formatDateTime } from "../../utils/dateFormatter";
import Calendar from "../../components/Calendar";

export function ViewLab () {

    const { computerLab, error, loading } = useComputerLab();

    if (error) return <p>Error...</p>
    if (loading) return <p>Loading...</p>

    console.log(computerLab);

    return (
        <div>
            <SubPageTitle to="/choose_lab" label="Back to Choose a Lab"
                         title={`Viewing ${computerLab.lab_name}`}
                         subTitle="View the computer lab details and availability"/>

            <div className="grid grid-cols-2">
                <div className="col-span-1 text-left">
                    <div>
                        <p className="text-xl font-bold font-heading my-2">Lab Information</p>

                        <div className="grid grid-cols-2 gap-y-5">
                            <DetailsPanel title="Computer Lab" content={computerLab.lab_name} />
                            <DetailsPanel title="Capacity" content={computerLab.capacity} />
                            <DetailsPanel title="Location" content={computerLab.location} />
                        </div>
                    </div>

                    <div className="my-5">
                        <p className="text-xl font-bold font-heading my-2">Computer Lab Reservations</p>

                        <div className="flex flex-col max-h-[calc(100vh-500px)] gap-5 overflow-y-auto scroll-smooth">
                            { computerLab.reservations ? 
                                computerLab.reservations.map((reservation) => {
                                    return (
                                        <ReservationCard reservation={reservation} computerLab={computerLab.lab_name}
                                                     name={reservation.full_name} status={reservation.status}
                                                     time={`${ formatDateTime(new Date(reservation.start_date))} - ${formatDateTime(new Date(reservation.end_date))}`}
                                                     key={reservation.id}
                                        />
                                    )
                                }) : "No reservations yet"
                            }
                        </div>
                    </div>
                </div>

                <div className="col-span-1">
                    <div className="flex justify-center gap-6">
                        <NavLink to={`/new_reservation/${computerLab.id}`}>
                            <button className="border-glow bg-glow py-2 px-4 font-heading font-bold rounded-lg">Reserve Lab</button>
                        </NavLink>
                        <button className="border-muted bg-muted py-2 px-4 font-heading font-bold rounded-lg">Edit Lab</button>
                        <button className="border-danger bg-danger py-2 px-4 font-heading font-bold rounded-lg">Delete Lab</button>
                    </div>

                    <div className="border">
                        <Calendar />
                    </div>
                </div>
            </div>
        </div>
    )

}