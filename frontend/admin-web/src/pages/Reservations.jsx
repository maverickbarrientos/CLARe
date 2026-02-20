import { PageTitle } from "../components/PageTitle"
import { ReservationCard } from "../components/ReservationCard"
import { Card } from './../components/Card';

export function Reservations() {

    return (
        <>
            <title>CLARe | Reservations</title>
            
            <PageTitle pageTitle="Reservations"/>

            <div>
                <div className="grid grid-cols-4 gap-5 my-5">
                    <input type="search" name="" id="" placeholder="Search Reservation" className="col-span-2 border-glow p-3 rounded-lg font-sans"/>
                    <input type="date" name="" id="" className="col-span-1 border-glow p-3 rounded-lg font-sans"/>
                    <button className="col-span-1 border-glow p-3 rounded-lg font-sans">Filter</button>
                </div>

                <div className="grid grid-cols-3 gap-5">
                    <div className="col-span-2 flex flex-col gap-5">
                        <ReservationCard 
                            computerLab="Computer Lab 7"
                            name="Maverick Jade Barrientos"
                            department="CITE"
                            time="February 7, 2026 10:00 A.M. - 11:00 A.M."
                            status="PENDING"
                            className="text-left border-glow"
                        />
                        
                        <ReservationCard 
                            computerLab="Computer Lab 1"
                            name="D-Renz Sabordo"
                            department="CITE"
                            time="February 8, 2026 10:00 A.M. - 11:00 A.M."
                            status="PENDING"
                            className="text-left border-glow"
                        />
                    </div>

                    <div className="col-span-1 border-glow p-5 rounded-2xl font-sans">
                        Calendar
                    </div>
                </div>
            </div>
            
        </>
    )

}