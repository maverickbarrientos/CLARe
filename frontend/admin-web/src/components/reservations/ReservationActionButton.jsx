import { useStatusUpdate } from "../../hooks/reservations/useStatusUpdate"

export function ReservationActionButton ({ type }) {

    const { updateStatus, error, loading } = useStatusUpdate();

    const actions = {
        reservation: {
            approve: () => updateStatus("approve"),
            reject: () => updateStatus("reject")
        },
        cancellation: {
            approve: () => updateStatus("approve_cancellation"),
            reject: () => updateStatus("reject_cancellation")
        }
    }

    const { approve, reject } = actions[type];

    return (

        <div>
            <div className="flex gap-3 justify-center">
                {error && <p className="text-danger">{error}</p>}

                <button className="bg-success px-4 py-2 font-heading font-bold rounded-lg hover:bg-pink-500"
                    onClick={approve}
                    disabled={loading}
                >Approve</button>

                <button className="bg-danger px-4 font-heading font-bold rounded-lg py-2 hover:bg-amber-200"
                    onClick={reject}
                    disabled={loading}
                >Reject</button>
            </div>

            <div>
                {error && <p className="text-danger">{error}</p>}
            </div>
        </div>

    )

}