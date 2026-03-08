import { useStatusUpdate } from "../../hooks/reservations/useStatusUpdate"

export function ReservationActionButton () {

    const { updateStatus, error, loading } = useStatusUpdate();

    const handleStatusUpdate = async (status) => {
        await updateStatus(status);
    }

    return (

        <div className="flex gap-3 justify-center">
            {error && <p className="text-danger">{error}</p>}

            <button className="bg-success px-4 py-2 font-heading font-bold rounded-lg hover:bg-red-600"
                onClick={() => handleStatusUpdate("approve")}
                disabled={loading}
            >Approve</button>

            <button className="bg-danger px-4 py-2 font-heading font-bold rounded-lg"
                onClick={() => handleStatusUpdate("reject")}
                disabled={loading}
            >Reject</button>
        </div>

    )

}