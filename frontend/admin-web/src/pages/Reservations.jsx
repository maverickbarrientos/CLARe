import { PageTitle } from "../components/PageTitle"
import { ReservationCard } from "../components/ReservationCard"
import Calendar from "../components/Calendar";
import { Card } from './../components/Card';
import { useReservations } from './../hooks/reservations/useReservations';
import { formatDateTime } from "../utils/dateFormatter";

export function Reservations() {

    const { reservations, search, setSearch, error, loading } = useReservations();

    if (loading) return <p>Loading....</p>
    if (error) return <p>{ error }</p>

    console.log("RESERVATIONS IN RESERVATIONS.JSX", reservations)

    return (
        <>
            <title>CLARe | Reservations</title>
            
            <PageTitle pageTitle="Reservations"/>

            <div>
                <div className="grid grid-cols-4 gap-5 my-5">
                    <input type="search" name="search" id="search" 
                        placeholder="Search Reservation" className="col-span-2 border-glow p-3 rounded-lg font-sans"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}/>
                    <input type="date" name="" id="" className="col-span-1 border-glow p-3 rounded-lg font-sans"/>
                    <button className="col-span-1 border-glow p-3 rounded-lg font-sans">Filter</button>
                </div>

                <div className="grid grid-cols-3 gap-5">
                    <div className="col-span-2 flex flex-col gap-5">
                        { reservations.map((reservation) => {
                            return (
                                <ReservationCard
                                    key={reservation.id}
                                    reservation={reservation}
                                    computerLab={reservation.computer_labs.lab_name}
                                    name={reservation.full_name}
                                    department={reservation.user.users_information.department}
                                    time={`${formatDateTime(new Date(reservation.start_date))} - ${formatDateTime(new Date(reservation.end_date))}`}
                                    status={reservation.status.toUpperCase()}
                                    className="text-left border-glow"
                                />
                            )
                        }) }
                    </div>

                    <div className="row-span-2 sticky top-5 h-fit">
                        <button className="border my-10">
                            Add Reservation
                        </button>
                        <div className="col-span-1 border-glow p-5 rounded-2xl font-sans">
                            <Calendar/>
                        </div>
                    </div>                        
                </div>
            </div>
            
        </>
    )

}