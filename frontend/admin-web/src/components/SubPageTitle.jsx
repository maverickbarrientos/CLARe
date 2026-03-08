import { NavLink } from "react-router-dom"

export function SubPageTitle ({ to, label, title, subTitle }) {

    return ( 
        <>
            <NavLink to={to} className="text-left max-w-fit flex gap-2 items-center">
                <button className="border-global rounded-lg items-center py-1 px-2 text-glow"><span className="material-symbols-outlined">arrow_back</span></button>
                <p className="font-heading text-disabled">{ label }</p>
            </NavLink>

            <div className="text-left my-5 flex flex-col gap-2">
                <p className="text-4xl font-heading"><strong>{ title }</strong></p>
                <p className="text-secondary">{ subTitle }</p>
            </div>
        </>
    )

}