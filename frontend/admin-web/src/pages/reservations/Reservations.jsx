import { NavLink } from "react-router-dom";
import { PageTitle } from "../../components/PageTitle"
import Calendar from "../../components/Calendar";
import { useReservations } from '../../hooks/reservations/useReservations';
import { formatSchedule } from "../../utils/dateFormatter";
import { WeeklyCalendar } from "../../components/shared/WeeklyCalendar";
import { useWeeklyEvents } from "../../hooks/reservations/useWeeklyEvents";
import { Modal } from "../../components/shared/Modal";

const statusConfig = {
    pending: { 
        label: "PENDING", 
        message: "waiting for approval", 
        color: "warning" 
    },
    cancellation_requested: { 
        label: "CANCELLATION REQUESTED", 
        message: "cancellation request under review", 
        color: "warning" 
    },
    reserved: { 
        label: "RESERVED", 
        message: "reservation confirmed", 
        color: "success" 
    },
    rejected: { 
        label: "REJECTED", 
        message: "reservation has been rejected", 
        color: "danger" 
    },
    in_use: { 
        label: "IN USE", 
        message: "currently in use", 
        color: "info" 
    },
    cancelled: { 
        label: "CANCELLED", 
        message: "reservation has been cancelled", 
        color: "muted" 
    },
    completed: { 
        label: "COMPLETED", 
        message: "session completed", 
        color: "teal" 
    },
};


export function Reservations() {

    const { reservations, search, setSearch, error, loading: reservationLoading } = useReservations();
    const { events, currentMonday, goToPrev, goToNext, loading: eventsLoading } = useWeeklyEvents();

    if (error) return <p>{ error }</p>

    console.log("RESERVATIONS IN RESERVATIONS.JSX", reservations)
    console.log();

    return (
        <div>
            <title>CLARe | Reservations</title>
            
            <PageTitle pageTitle="Reservations"/>

            <div>

                { reservationLoading || eventsLoading && <Modal type={"loading"} title={"Processing"} subTitle={"Please wait while we retrieve reservation details."} /> }
                
                <div className="grid grid-cols-3 gap-5">
                    <div className="col-span-2 border-global p-5 rounded-2xl font-sans">
                        <WeeklyCalendar 
                            events={events}
                            currentMonday={currentMonday}
                            onPrev={goToPrev}
                            onNext={goToNext}
                        />
                    </div>
                    <div className="col-span-1 row-span-1 border-glow p-5 rounded-2xl font-sans">
                    </div>
                </div>

                <div className="grid grid-cols-5 gap-5 my-5">
                    <input type="search" name="search" id="search" 
                        placeholder="Search Reservation" className="col-span-2 border-global p-2 rounded-lg font-sans"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}/>
                    <input type="date" name="" id="" className="col-span-1 border-global p-2 rounded-lg font-sans"/>
                    <button className="col-span-1 border-glow p-2 rounded-lg font-heading font-bold">Filter</button>
                    <NavLink to={"/choose_lab"}>
                        <button className="col-span-1 border w-full py-2 rounded-lg font-heading font-bold border-glow bg-glow hover:bg-pink-500">
                            Add Reservation
                        </button>
                    </NavLink>
                </div>

                    <div className="col-span-2 border rounded-2xl border-glow">
                        <table className="w-full text-left [&_th]:p-4 [&_td]:p-4">
                            {/* { reservations.map((reservation) => {
                                return (
                                    <ReservationCard
                                        key={reservation.id}
                                        reservation={reservation}
                                        computerLab={reservation.computer_labs.lab_name}
                                        name={reservation.full_name}
                                        department={reservation.user.users_information.department}
                                        time={`${formatDateTime(new Date(reservation.start_date))} - ${formatDateTime(new Date(reservation.end_date))}`}
                                        status={reservation.status.toUpperCase()}
                                        className="text-left"
                                    />
                                )
                            }) } */}

                                <thead className="font-bold font-heading border-b-stroke">
                                    <tr>
                                        <th>Computer Lab</th>
                                        <th>Full Name</th>
                                        <th>Time</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y font-sans">
                                    { reservations.map((reservation) => {
                                        const status = statusConfig[reservation.status];
                                        return (
                                            <tr key={reservation.id}>
                                                <td>{ reservation.computer_labs.lab_name }</td>
                                                <td>{ reservation.full_name }</td>
                                                <td className="text-sm">{ formatSchedule(reservation.start_date, reservation.end_date) }</td>
                                                <td className={`font-heading font-bold text-xs`}>
                                                <div className={`rounded-full bg-dark-gray border-${status.color} text-center p-1`}>
                                                    <p className={`text-${status.color}`}>{ status.label }</p>
                                                </div>
                                            </td>
                                            <td>
                                                <NavLink to={ `/update_reservation/${reservation.id}` }><span className="material-symbols-outlined">edit</span></NavLink>
                                                <NavLink to={ `/reservation/${reservation.id}` }><span className="material-symbols-outlined">visibility</span></NavLink>
                                            </td>
                                        </tr>
                                    )
                                }) }
                            </tbody>

                        </table>
                    </div>                        
                </div>
            
        </div>
    )

}