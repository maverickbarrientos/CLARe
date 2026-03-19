import { SubPageTitle } from "../../components/SubPageTitle"
import { useLabClass } from "../../hooks/lab_class/useLabClass"
import { DetailsPanel } from "../../components/shared/DetailsPanel";
import { Modal } from "../../components/shared/Modal";

export function ViewClass () {

    const { labClass, error, loading } = useLabClass();

    if (loading) return <Modal type={"loading"} title={"Loading Computer Labs"} subTitle={"Please wait while we fetch laboratory data."} />
    if (error) return <p>{error}</p>

    return (
        <div>

            <SubPageTitle to={"/lab_class"}
                label={"Back to Class"}
                title={"View Class"}
                subTitle={"View the details and schedule of this class session."}
            />

            <div>
                <div className="text-left w-3/12 my-4">
                    <p className="text-xl font-bold font-heading my-2">Computer Lab</p>
                    <div className={`bg-dark-gray border-glow rounded-xl text-left p-5 pr-10`}>
                        <p className="font-heading text-lg font-bold text-secondary text-left">
                            {labClass.day.toUpperCase()}
                        </p>
                        <p className="font-heading text-md font-bold text-secondary text-left">
                            {labClass.computer_labs.lab_name}
                        </p>
                        <p className="font-sans">{ labClass.computer_labs.location }</p>
                    </div>
                </div>
            </div>

            <div className="text-left">
                <p className="text-xl font-bold font-heading mb-3">Class Information</p>
                
                <div className="w-3/4">
                    <div className="grid grid-cols-2 gap-y-5">
                        <DetailsPanel title="Subject"    content={labClass.subject} />
                        <DetailsPanel title="Teacher"    content={labClass.teacher} />
                        <DetailsPanel title="Section"    content={labClass.section} />
                        <DetailsPanel title="Department" content={labClass.department} />
                        <DetailsPanel title="Start Time" content={labClass.start_time} />
                        <DetailsPanel title="End Time"   content={labClass.end_time} />
                    </div>
                </div>
            </div>
        </div>

    )

}