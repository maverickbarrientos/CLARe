import { SubPageTitle } from "../../components/SubPageTitle"
import { useReservation } from "../../hooks/reservations/useReservation"
import { UpdateReservationForm } from "../../components/reservations/UpdateReservationForm";
import { Modal } from "../../components/shared/Modal";

export function UpdateReservation () {

    const { reservation, error, loading } = useReservation();

    if (error) return <p>Error...</p>

    console.log(reservation);

    return (

        <div>

            <SubPageTitle to={"/reservations"}
                label={"Back to Reservations"}
                title={"Update Reservation"}
                subTitle={"Modify and update the reservation details below."}
            />

            { loading && <Modal type={"loading"} title={"Processing"} subTitle={"Please wait while we retrieve reservation details."} /> }

            <div>
                <UpdateReservationForm reservation={reservation} />
            </div>

        </div>

    )

}