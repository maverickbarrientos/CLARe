import { DetailsPanel } from "../components/shared/DetailsPanel";

export function QRModal({ reservation, onClose }) {

    const res = reservation.reservations;

    return (
        <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
            <div className="border-global p-6 bg-black/60 rounded-xl w-2/3">

                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <p className="font-heading font-bold text-xl">QR Code Details</p>
                    <button
                        onClick={onClose}
                        className="font-bold text-xl hover:text-danger transition-colors"
                    >✕</button>
                </div>

                <div className="grid grid-cols-3 gap-6">

                    {/* Col 3 - Reservation details */}
                    <div className="flex flex-col gap-4">
                        <DetailsPanel title="Start Date"  content={res?.start_date} />
                        <DetailsPanel title="End Date"    content={res?.end_date} />
                        <DetailsPanel title="Status"      content={res?.status} />
                    </div>

                </div>
            </div>
        </div>
    )
}