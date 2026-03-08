import { useParams } from "react-router-dom"
import { SubPageTitle } from "../../components/SubPageTitle"
import { CreateReservation } from "../../components/reservations/index"

export function NewReservation () {

    const { lab_id } = useParams();
    
    return (
        <div>
            <SubPageTitle to={`/view_lab/${lab_id}`} label="Back to View Lab"
                         title="Create Reservation"
                         subTitle="Select a lab and time slot to complete your reservation." />

            <CreateReservation />
        </div>
    )

}