import { NavLink } from "react-router-dom";
import { useReservation } from "../../hooks/reservations/useReservation";
import { QRCard } from "../../components/QRCard";
import { formatDateTime } from "../../utils/dateFormatter";
import { SubPageTitle } from "../../components/SubPageTitle";
import { DetailsPanel } from "../../components/shared/DetailsPanel";
import { ReservationStatusCard, ReservationActionButton } from "../../components/reservations/index";

export function ViewReservation() {

    const { reservation, error, loading } = useReservation();

    if (error) return <p>Error...</p>;
    if (loading) return <p>Loading...</p>;

    console.log(reservation);

    return (
        <div>
            <SubPageTitle to="/reservations" label="Back to Reservations" 
                title={`Reservation of ${ reservation.full_name }`}
                subTitle="Review the reservation details and current status" />

            <div className="grid grid-cols-2 gap-5 items-center">
                <ReservationStatusCard status={ reservation.status } />

                <div className="text-left my-5 col-span-1">
                    <div className="flex gap-3 p-4 border-glow rounded-lg items-center align-middle">
                        <p className="text-lg font-heading font-bold">{ reservation.computer_labs.lab_name }</p>
                        <p>●</p>
                        <p className="font-sans">{ reservation.computer_labs.location }</p>
                    </div>
                </div>
            </div>


            { reservation.qr_codes && <QRCard qr_code={ reservation.qr_codes } /> }

            <div className="text-left my-5">

                <p className="text-xl font-bold font-heading my-2">Reservation Information</p>

                <div className="grid grid-cols-2 gap-y-5">
                    <DetailsPanel title="Full Name" content={ reservation.full_name } />
                    <DetailsPanel title="Department" content={ reservation.user.users_information.department } />
                    <DetailsPanel title="Start Date" content={ formatDateTime(new Date(reservation.start_date))  } />
                    <DetailsPanel title="End Date" content={ formatDateTime(new Date(reservation.end_date))  } />
                    <DetailsPanel title="Description" content={ reservation.description } />
                </div>

                { reservation.status === "pending" && <ReservationActionButton /> }

            </div>
        </div>
    )

}