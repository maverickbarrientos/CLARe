import { NavLink } from "react-router-dom";
import { useReservation } from "../../hooks/reservations/useReservation";
import { QRCard } from "../../components/QRCard";
import { formatDateTime } from "../../utils/dateFormatter";
import { SubPageTitle } from "../../components/SubPageTitle";
import { DetailsPanel } from "../../components/shared/DetailsPanel";
import { ReservationStatusCard, ReservationActionButton } from "../../components/reservations/index";
import { Modal } from "../../components/shared/Modal";
import { useState } from "react";
import { useStatusUpdate } from "../../hooks/reservations/useStatusUpdate";
import { useDeleteReservation } from "../../hooks/reservations/useDeleteReservation";

export function ViewReservation() {

    const { reservation, error, loading } = useReservation();
    const { remove, error: deleteError, loading: deleteLoading } = useDeleteReservation();
    const [successModalOpen, setSuccessModalOpen] = useState(false);
    const [errorModalOpen, setErrorModalOpen] = useState(false);
    const { updateStatus, loading: statusLoading } = useStatusUpdate();
    const [rejectReason, setRejectReason] = useState("");
    const [approveModal, setApproveModal] = useState(false);
    const [rejectModal, setRejectModal] = useState(false);
    const [approveCancellationModal, setApproveCancellationModal] = useState(false);
    const [rejectCancellationModal, setRejectCancellationModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);

    const handleAction = async (action) => {
        await updateStatus(action, rejectReason);
        setRejectReason("");
        setApproveModal(false);
        setRejectModal(false);
        setApproveCancellationModal(false);
        setRejectCancellationModal(false);
    }

    const handleDelete = async () => {
        const result = await remove();

        if (result.status === 200) {
            setSuccessModalOpen(true)
        } 

        if (deleteError) {
            setErrorModalOpen(true);
        }

        window.location.href = "/reservations";
    }

    if (error) return <p>Error...</p>;
    if (loading) return <Modal type={"loading"} title={"Processing"} subTitle={"Please wait while we retrieve reservation details."} />

    console.log(reservation);

    return (
        <div>

            { statusLoading && <Modal type={"loading"} title={"Approving Reservation"} subTitle={"Please wait while we process the approval."} /> }

            { deleteLoading && <Modal type={"loading"} title={"Deleting reservation"} subTitle={"The reservation is being deleted. Please do not close this page."} /> }
            { successModalOpen && <Modal type={"success"} title={"Deletion successful"} subTitle={"The reservation has been permanently deleted from the system."} onClose={() => setSuccessModalOpen(false)} /> }
            { errorModalOpen && <Modal type={"error"} title={"Deletion failed"} subTitle={"An error occurred while deleting the reservation. Please try again or contact support."} onClose={() => setErrorModalOpen(false)} /> }

            {approveModal &&
                <Modal
                    type="approve"
                    title="Approve Reservation"
                    subTitle="This will confirm the reservation and notify the user."
                    onClose={() => setApproveModal(false)}
                    onConfirm={() => handleAction("approve")}
                />
            }

            {rejectModal &&
                <Modal
                    type="reject"
                    title="Reject Reservation"
                    subTitle="This will reject the reservation and notify the user."
                    onClose={() => setRejectModal(false)}
                    onConfirm={() => handleAction("reject")}
                    rejectReason={rejectReason}
                    onRejectReasonChange={setRejectReason}
                />
            }

            {approveCancellationModal &&
                <Modal
                    type="approve"
                    title="Approve Cancellation"
                    subTitle="This will cancel the reservation and notify the user."
                    onClose={() => setApproveCancellationModal(false)}
                    onConfirm={() => handleAction("approve_cancellation")}
                />
            }

            {rejectCancellationModal &&
                <Modal
                    type="reject"
                    title="Reject Cancellation"
                    subTitle="This will deny the cancellation request and keep the reservation active."
                    onClose={() => setRejectCancellationModal(false)}
                    onConfirm={() => handleAction("reject_cancellation")}
                    rejectReason={rejectReason}
                    onRejectReasonChange={setRejectReason}
                />
            }

            {deleteModal &&
                <Modal
                    type="confirm"
                    title="Delete reservation"
                    subTitle="Are you sure you want to delete this reservation? This action cannot be undone."
                    onClose={() => setDeleteModal(false)}
                    onConfirm={() => handleDelete()}
                    rejectReason={rejectReason}
                    onRejectReasonChange={setRejectReason}
                />
            }

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

            <div className="text-left my-5 mb-5">
                { (reservation.status === "rejected" && reservation.reject_reason) && <DetailsPanel title="Rejection Reason" content={ reservation.reject_reason } /> }
            </div>

            { reservation.qr_codes && <QRCard qr_code={ reservation.qr_codes } /> }

            <div className="text-left my-5">

                <p className="text-xl font-bold font-heading my-2">Reservation Information</p>

                <div className="grid grid-cols-2 gap-y-5">
                    <DetailsPanel title="Full Name" content={ reservation.full_name } />
                    <DetailsPanel title="Department" content={ reservation.user.users_information.department } />
                    <DetailsPanel title="Start Date" content={ formatDateTime(new Date(reservation.start_date))  } />
                    <DetailsPanel title="End Date" content={ formatDateTime(new Date(reservation.end_date))  } />
                    <DetailsPanel title="Description" content={ reservation.reservation_description } />
                    { reservation.status === "cancellation_requested" || (reservation.status === "cancelled") &&
                        <DetailsPanel title="Cancellation Reason" content={reservation.cancellation_requests.cancellation_reason}/>  }
                </div>

                {reservation.status === "pending" &&
                    <ReservationActionButton
                        type="reservation"
                        onApprove={() => setApproveModal(true)}
                        onReject={() => setRejectModal(true)}
                    />
                }

                {reservation.status === "cancellation_requested" &&
                    <ReservationActionButton
                        type="cancellation"
                        onApprove={() => setApproveCancellationModal(true)}
                        onReject={() => setRejectCancellationModal(true)}
                    />
                }

                {
                    ["cancelled", "rejected", "completed"].includes(reservation.status) && 
                    <button className="flex-1 py-2 px-4 rounded-lg font-heading font-bold bg-red-700 hover:bg-red-600 text-white"
                        onClick={() => setDeleteModal(true)}
                    >DELETE</button>
                }
            </div>
        </div>
    )

}