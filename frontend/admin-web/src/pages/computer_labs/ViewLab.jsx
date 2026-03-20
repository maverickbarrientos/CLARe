import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useComputerLab } from "../../hooks/computer_labs/useComputerLab"
import { useWeeklyLabUsage } from "../../hooks/computer_labs/useWeeklyLabUsage";
import { SubPageTitle } from "../../components/SubPageTitle";
import { DetailsPanel } from "../../components/shared/DetailsPanel";
import { ReservationCard } from "../../components/reservations/ReservationCard";
import { formatDateTime } from "../../utils/dateFormatter";
import { WeeklyCalendar } from "../../components/shared/WeeklyCalendar"
import { Modal } from "../../components/shared/Modal";
import { useDeleteLab } from "../../hooks/computer_labs/useDeleteLab"

export function ViewLab () {

    const { computerLab, error, loading } = useComputerLab();
    const { remove, error: deleteError, loading: deleteLoading } = useDeleteLab();
    const [successModalOpen, setSuccessModalOpen] = useState(false);
    const [errorModalOpen, setErrorModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const { events, goToNext, goToPrev, currentMonday } = useWeeklyLabUsage();

    if (error) return <p>Error...</p>

    const handleDelete = async () => {
        const result = await remove();

        if (result.status === 200) {
            setSuccessModalOpen(true)
        } 

        if (deleteError) {
            setErrorModalOpen(true);
        }
    }

    console.log(computerLab);

    return (
        <div>
            { deleteLoading && <Modal type={"success"} title={"Deleting"} subTitle={"Computer lab is being deleted, please wait."} /> }
            { successModalOpen && <Modal type={"success"} title={"Deletion successful"} subTitle={"The computer lab has been permanently deleted from the system."} onClose={() => setSuccessModalOpen(false)} /> }
            { errorModalOpen && <Modal type={"error"} title={"Deletion failed"} subTitle={"An error occurred while deleting the computer lab. Please try again or contact support."} onClose={() => setErrorModalOpen(false)} /> }

            <SubPageTitle to="/choose_lab" label="Back to Choose a Lab"
                         title={`Viewing ${computerLab.lab_name}`}
                         subTitle="View the computer lab details and availability"/>

            { loading && <Modal type={"loading"} title={"Loading Computer Labs"} subTitle={"Please wait while we fetch laboratory data."} /> }

            {deleteModalOpen &&
                <Modal
                    type="confirm"
                    title="Delete Computer Lab"
                    subTitle="This will permanently delete the lab and all associated reservations."
                    onClose={() => setDeleteModalOpen(false)}
                    onConfirm={handleDelete}
                />
            }

            <div className="grid grid-cols-2 gap-5">
                <div className="col-span-1 text-left">
                    <div>
                        <p className="text-xl font-bold font-heading my-2">Lab Information</p>

                        <div className="grid grid-cols-2 gap-y-5">
                            <DetailsPanel title="Computer Lab" content={computerLab.lab_name} />
                            <DetailsPanel title="Capacity" content={computerLab.capacity} />
                            <DetailsPanel title="Location" content={computerLab.location} />
                        </div>
                    </div>

                    <div className="my-5">
                        <p className="text-xl font-bold font-heading my-2">Computer Lab Reservations</p>

                        <div className="flex flex-col max-h-[calc(100vh-500px)] gap-5 overflow-y-auto scroll-smooth [&::-webkit-scrollbar]:hidden">
                            { computerLab.reservations ? 
                                computerLab.reservations.map((reservation) => {
                                    return (
                                        <ReservationCard reservation={reservation} computerLab={computerLab.lab_name}
                                                     name={reservation.full_name} status={reservation.status}
                                                     department={reservation.department}
                                                     time={`${ formatDateTime(new Date(reservation.start_date))} - ${formatDateTime(new Date(reservation.end_date))}`}
                                                     key={reservation.id}
                                        />
                                    )
                                }) : "No reservations yet"
                            }
                        </div>
                    </div>
                </div>

                <div className="col-span-1">
                    <div className="flex justify-center gap-3">
                        <NavLink to={`/create_class/${computerLab.id}`}>
                            <button className="border-glow bg-glow py-2 px-3 font-heading font-bold rounded-lg">Create Class</button>
                        </NavLink>
                        <NavLink to={`/new_reservation/${computerLab.id}`}>
                            <button className="border-glow bg-glow py-2 px-3 font-heading font-bold rounded-lg">Reserve Lab</button>
                        </NavLink>
                        <NavLink to={`/update_lab/${computerLab.id}`}>
                            <button className="border-muted bg-muted py-2 px-3 font-heading font-bold rounded-lg">Edit Lab</button>
                        </NavLink>
                        <button onClick={() => {setDeleteModalOpen(true)}} 
                            className="border-danger bg-danger py-2 px-3 font-heading font-bold rounded-lg">Delete Lab</button>
                    </div>

                    <div className="col-span-2 border-global p-5 rounded-2xl font-sans">
                        <WeeklyCalendar events={events}
                            onNext={goToNext}
                            onPrev={goToPrev}
                            currentMonday={currentMonday}
                        />
                    </div>
                </div>
            </div>
        </div>
    )

}