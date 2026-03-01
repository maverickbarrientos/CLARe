import { NavLink } from 'react-router-dom';

export function ReservationCard({ reservation, computerLab, name, department, time, status, className = "" }) {

    return (
        <div className={`relative text-left border-glow p-5 rounded-2xl font-sans ${className}`}>
  
            <p className="font-heading font-bold text-3xl">{computerLab}</p>
            <p>{name}</p>
            <p>{department}</p>
            <p className="text-xs text-secondary">{time}</p>
            <p className="font-heading font-bold">{status}</p>

            <NavLink to={`/reservation/${reservation.id}`}>    
                <button className="absolute bottom-5 right-5 px-4 py-1 border-4 font-bold text-xl align-middle justify-center rounded-full border-glow text-glow">
                    {"›"}
                </button>
            </NavLink>

        </div>
    )
    
}