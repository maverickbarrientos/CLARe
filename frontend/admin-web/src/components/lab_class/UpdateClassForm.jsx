import { useState } from "react"
import { ClassForm } from "./ClassForm";
import { useComputerLabs } from "../../hooks/computer_labs/useComputerLabs";
import { useUpdateClass } from "../../hooks/lab_class/useUpdateClass";

export function UpdateClassForm ({ labClass, loading }) {

    const { computerLabs } = useComputerLabs();
    const { update, error, loading: updateLoading } = useUpdateClass();
    const [classForm, setClassForm] = useState({
        lab_id: labClass.lab_id,
        subject: labClass.subject,
        department: labClass.department,
        section: labClass.section,
        teacher: labClass.teacher,
        day: labClass.day,
        start_time: labClass.start_time,
        end_time: labClass.end_time
    });

    const handleChange = (e) => {
        setClassForm(prev => ({
            ...prev, 
            [e.target.name] : e.target.name === "lab_id" ? parseInt(e.target.value) : e.target.value 
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log({...classForm, lab_id: classForm.lab_id });
        await update({...classForm, lab_id: classForm.lab_id})
    }

    return (
        
        <div>

            { updateLoading && <Modal type={"loading"} title={"Updating Class"} subTitle={"Please wait while we update class details."} /> }
            
            <ClassForm classForm={classForm} computerLab={labClass.computer_labs}
                handleChange={handleChange} handleSubmit={handleSubmit}
                loading={loading} submitLabel={"UPDATE"}
            >
                <div className="flex flex-col items-start">
                    <p className="text-xl font-bold font-heading my-2">Computer Lab</p>
                    <select name="lab_id" onChange={handleChange}
                        value={classForm.lab_id}
                        className="py-2 px-4 rounded-lg border-global font-sans bg-black text-white font-heading">
                        { computerLabs.map((computerLab) => {
                          return (
                            <option value={computerLab.id} key={computerLab.id}>
                                { `${computerLab.lab_name} - ${computerLab.location}` }
                            </option>
                          )  
                        }) }
                    </select>
                </div>

            </ClassForm>
        </div>


    )

}