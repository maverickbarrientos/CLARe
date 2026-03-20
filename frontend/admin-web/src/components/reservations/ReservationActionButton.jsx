
export function ReservationActionButton ({ onApprove, onReject }) {

    return (

        <div>
            <div className="flex gap-3 justify-center">

                <button className="bg-success px-4 py-2 font-heading font-bold rounded-lg hover:bg-pink-500"
                    onClick={onApprove}
                >Approve</button>

                <button className="bg-danger px-4 font-heading font-bold rounded-lg py-2 hover:bg-amber-200"
                    onClick={onReject}
                >Reject</button>
            </div>
        </div>

    )

}