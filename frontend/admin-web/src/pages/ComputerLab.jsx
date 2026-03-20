import { NavLink } from "react-router-dom"
import { PageTitle } from "../components/PageTitle"
import { Card } from "../components/Card"
import { Modal } from "../components/shared/Modal"
import { LabCard } from "../components/computer_labs/LabCard"
import { useComputerLabs } from "../hooks/computer_labs/useComputerLabs"
import { useComputerLabAnalytics } from "../hooks/computer_labs/useComputerLabAnalytics"

export function ComputerLab() {

    const { computerLabs, error: labsError, loading: labsLoading } = useComputerLabs();
    const { analytics, error: analyticsError, loading: analyticsLoading } = useComputerLabAnalytics();

    return (
        <div className="flex flex-col gap-10 text-left">
            <title>CLARe | Computer Lab</title>

            {labsLoading && (
                <Modal
                    type="loading"
                    title="Loading Computer Labs"
                    subTitle="Please wait while we fetch lab data."
                />
            )}

            {labsError && (
                <Modal
                    type="error"
                    title="Something went wrong"
                    subTitle="Failed to load computer labs."
                    onClose={() => window.location.reload()}
                />
            )}

            <PageTitle pageTitle="Computer Lab" />

            {/* LAB ANALYTICS */}
            <div className="flex flex-col gap-4">
                <p className="text-xl font-heading font-bold">Lab Analytics</p>
                <div className="grid grid-cols-3 gap-7">

                    <Card cardTitle="MOST USED LAB">
                        <div className="flex flex-col items-center justify-center h-full gap-1 font-sans py-4">
                            {analyticsLoading ? (
                                <p className="text-secondary text-sm">Loading...</p>
                            ) : (
                                <>
                                    <p className="text-white font-heading font-bold text-xl">
                                        {analytics?.most_used_lab?.lab_name ?? "—"}
                                    </p>
                                    <p className="text-secondary text-sm">
                                        {analytics?.most_used_lab?.count ?? 0} reservations (Last 7 days)
                                    </p>
                                </>
                            )}
                        </div>
                    </Card>

                    <Card cardTitle="TOTAL RESERVATIONS">
                        <div className="flex flex-col items-center justify-center h-full gap-1 font-sans py-4">
                            {analyticsLoading ? (
                                <p className="text-secondary text-sm">Loading...</p>
                            ) : (
                                <>
                                    <p className="text-white font-heading font-bold text-xl">
                                        {analytics?.total_reservations ?? 0}
                                    </p>
                                    <p className="text-secondary text-sm">Total reservations (Last 7 days)</p>
                                </>
                            )}
                        </div>
                    </Card>

                    <Card cardTitle="LAB UTILIZATION RATE">
                        <div className="flex flex-col items-center justify-center h-full gap-1 font-sans py-4">
                            {analyticsLoading ? (
                                <p className="text-secondary text-sm">Loading...</p>
                            ) : (
                                <>
                                    <p className="text-white font-heading font-bold text-xl">
                                        {analytics?.utilization_rate ?? 0}%
                                    </p>
                                    <p className="text-secondary text-sm">Last 7 days</p>
                                </>
                            )}
                        </div>
                    </Card>

                </div>
            </div>

            {/* MANAGE COMPUTER LABS */}
            <div className="flex flex-col gap-4">
                <p className="text-xl font-heading font-bold">Manage Computer Labs</p>

                <div className="flex items-center justify-between">
                    <div className="flex gap-3">
                        <input
                            type="search"
                            name="search"
                            id="search"
                            placeholder="Search Computer Lab"
                            className="border-global p-2 rounded-lg font-sans"
                        />
                        <button className="border-glow py-2 px-4 rounded-lg font-heading font-bold">
                            Filter
                        </button>
                    </div>

                    <NavLink to="/create_lab">
                        <button className="py-2 px-4 rounded-lg font-heading font-bold border-glow bg-glow">
                            Add New Lab
                        </button>
                    </NavLink>
                </div>

                <div className="grid grid-cols-3 gap-7">
                    {!labsLoading && computerLabs?.map((computerLab) => (
                        <LabCard
                            key={computerLab.id}
                            labName={computerLab.lab_name}
                            location={computerLab.location}
                            capacity={computerLab.capacity}
                            lab_id={computerLab.id}
                        >
                            <p className="font-bold font-heading">
                                {`${computerLab.reservations.length} reservations`}
                            </p>
                        </LabCard>
                    ))}
                </div>

            </div>

        </div>
    )
}