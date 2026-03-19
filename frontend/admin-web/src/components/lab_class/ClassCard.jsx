import { NavLink } from "react-router-dom";


export function ClassCard ({ labName, teacher, subject, department, startTime, endTime }) {

    return (

        <div className="bg-dark-gray border-global p-5 rounded-lg text-left">

            <div className="flex justify-between mb-1 items-center">
                <p className="font-sans">{ labName }</p>
                <NavLink>
                    <button className="px-3 py-1 border-global bg-dark-gray rounded-lg">View</button>
                </NavLink>
            </div>

            <div>
                <p className="font-heading font-bold">{ `${teacher} - ${department}` }</p>
            </div>

            <div className="flex justify-between">
                <p>{ subject }</p>
                <p>{ `${startTime} - ${endTime}` }</p>
            </div>

        </div>

    )

}