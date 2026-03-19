import { NavLink } from "react-router-dom"
import { PageTitle } from "../../components/PageTitle"
import { ClassCard } from "../../components/lab_class/ClassCard"
import { useLabClasses } from "../../hooks/lab_class/useLabClasses"
import { useWeeklyClass } from "../../hooks/lab_class/useWeeklyClass"
import { WeeklyCalendar } from "../../components/shared/WeeklyCalendar"
import { Modal } from "../../components/shared/Modal"

export function LabClass () {

    const { classPerDay, todayClasses, day, fetchClasses, setDay, error, pageLoading, classLoading } = useLabClasses();
    const { events, goToNext, goToPrev, currentMonday } = useWeeklyClass();
    
    if (error) return <p>Error...</p>

    const handleChangeDay = (day) => {
        
        setDay(day)
        fetchClasses(day);
    }


    return (

        <div>

            <title>CLARe | Class</title>      

            <PageTitle pageTitle={"Lab Class"} />

            { (pageLoading || classLoading) && <Modal type={"loading"} title={"Loading Computer Labs"} subTitle={"Please wait while we fetch laboratory data."} /> }

            <div className="grid grid-cols-2 gap-5 row-span-2">
                
                <div className="bg-dark-gray border-glow p-5 rounded-xl col-span-1">
                    <p className="text-left font-heading font-bold text-xl mb-4">Class Today</p>

                    <div className="flex flex-col gap-3">
                        { todayClasses.map((lab_class) => {
                            return (
                                <ClassCard labName={lab_class.computer_labs.lab_name} teacher={lab_class.teacher} subject={lab_class.subject}
                                    department={lab_class.department} startTime={lab_class.start_time} endTime={lab_class.end_time} key={lab_class.id} />
                            )
                        }) }
                    </div>
                </div>

                <div className="bg-dark-gray border-glow p-5 rounded-xl col-span-1">
                    <WeeklyCalendar events={events}
                        currentMonday={currentMonday}
                        onPrev={goToPrev}
                        onNext={goToNext}
                    />
                </div>

            </div>

            <div>
                <p className="text-xl font-bold font-heading my-2 text-left">Weeks</p>
                
                <div className="flex justify-between">
                    <div className="flex gap-3">
                        {["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"].map((d) => (
                            <button
                                key={d}
                                className={`border border-global py-2 px-4 rounded-lg font-heading ${day === d ? "bg-glow" : ""}`}
                                onClick={() => handleChangeDay(d)}
                            >
                                {d.charAt(0).toUpperCase() + d.slice(1)}
                            </button>
                        ))}
                    </div>
                    <div>
                        <NavLink to={"/choose_lab"}>
                            <button className="col-span-1 border w-full py-2 px-4 rounded-lg font-heading font-bold border-glow bg-glow hover:bg-pink-500">
                                Create Class
                            </button>
                        </NavLink>
                    </div>
                </div>

                <div className="col-span-2 border rounded-2xl border-glow my-5">
                    <table className="w-full text-left [&_th]:p-4 [&_td]:p-4">
                        <thead className="font-bold font-heading border-b-stroke">
                            <tr>
                                <th>Computer Lab</th>
                                <th>Teacher</th>
                                <th>Subject</th>
                                <th>Department</th>
                                <th>Start Time</th>
                                <th>End Time</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {classLoading ? (
                                <tr><td colSpan={7} className="text-center">Loading...</td></tr>
                            ) : (
                                classPerDay.map((lab_class) => (
                                    <tr key={lab_class.id}>
                                        <td>{lab_class.computer_labs.id}</td>
                                        <td>{lab_class.teacher}</td>
                                        <td>{lab_class.subject}</td>
                                        <td>{lab_class.department}</td>
                                        <td>{lab_class.start_time}</td>
                                        <td>{lab_class.end_time}</td>
                                        <td>
                                            <NavLink to={ `/update_class/${lab_class.id}` }><span className="material-symbols-outlined">edit</span></NavLink>
                                            <button><span className="material-symbols-outlined">delete</span></button>
                                            <NavLink to={ `/view_class/${lab_class.id}` }><span className="material-symbols-outlined">visibility</span></NavLink>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

            </div>

        </div>

    )

}