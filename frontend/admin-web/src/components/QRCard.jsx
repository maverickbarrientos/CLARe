import { useReservation } from "../hooks/reservations/useReservation";
import { formatDateTime } from "../utils/dateFormatter";
import { useInvalidateQR } from "../hooks/reservations/useInvalidateQR";

const statusConfig = {

    valid : { 
        label : "VALID",
        color: "success",
    }, invalid : {
        label: "INVALID",
        color: "danger"  
    }

}

export function QRCard ({ qr_code }) {
    const status = statusConfig[qr_code.status]

    const { invalidate } = useInvalidateQR();
    const { fetchReservation } = useReservation();

    const handleInvalidateQR = async (qr_value) => {
        await invalidate(qr_value);
        fetchReservation();
    }

    return (
        <div>
            
            <p className="text-left font-heading font-bold text-xl my-2">QR Code</p>

            <div className="flex gap-7">
                <div className="border-glow w-3/12 p-6 rounded-xl">
                    <img className="w-full"
                        src={ `${qr_code.image_url}` } alt="QR Code URL" 
                    />
                </div>

                <div className="flex flex-col h-2/3 self-center gap-5">
                    <div className={`gap-3 bg-dark-gray border-${status.color} p-2 px-4 w-3/6 rounded-lg items-center`}>
                        <p className={`font-bold text-${status.color} font-heading text-lg`}>{status.label}</p>
                    </div>

                    <div className="text-left">
                        <p>Date Issued : <span>{ formatDateTime(new Date(qr_code.issue_date)) }</span></p>
                        <p>Expiry Date : <span>{ formatDateTime(new Date(qr_code.expiry_date)) }</span></p>
                    </div>

                    { qr_code.status === "valid" ? 
                        <button className="bg-danger font-heading font-bold w-1/2 p-2 rounded-lg"
                            onClick={() => {handleInvalidateQR(qr_code.qr_value)}}
                        >INVALIDATE</button> :
                        <button className="bg-success font-heading font-bold w-1/2 p-2 rounded-lg"
                        >VALIDATE
                        </button>
                    }
                </div>
            </div>

        </div>
    )

}