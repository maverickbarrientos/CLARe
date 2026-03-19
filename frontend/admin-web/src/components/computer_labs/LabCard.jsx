import { NavLink } from "react-router-dom"
import { Card } from "../Card"

export function LabCard ({ labName, location, capacity, lab_id, children }) {

    return (

        <Card className="text-left pr-10" cardTitle={labName}>
            <div className="my-4">
                <p className="font-sans">{ location }</p>
                <p className="font-sans">{ capacity }</p>
                {children}
            </div>
            <NavLink to={`/view_lab/${lab_id}`}>    
                <p className="font-heading">View Lab</p>
            </NavLink>
        </Card>
    )

}