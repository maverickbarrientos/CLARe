import { NavLink } from "react-router-dom"
import { PageTitle } from "../components/PageTitle"
import { Card } from "../components/Card"
import { LabCard } from "../components/computer_labs/LabCard"
import { useComputerLabs } from "../hooks/computer_labs/useComputerLabs"

export function ComputerLab() {

    const { computerLabs, error, loading } = useComputerLabs();

    if (error) return <p>Error...</p>
    if (loading) return <p>Loading...</p>

    console.log(computerLabs);

    return (
        <div>
            <title>CLARe | Computer Lab</title>
            
            <PageTitle pageTitle="Computer Lab"/>

                <div>
                    <p className="text-xl text-left font-heading font-bold my-3">Lab Analytics</p>
                    <div className="grid grid-cols-3 gap-7">

                        <Card cardTitle="MOST USED LAB">
                            <div className="flex flex-col items-center justify-center h-full">
                                <p>Computer Lab 7</p>
                                <p>3 reservations (Last 7 days)</p>
                            </div>
                        </Card>
        
                        <Card cardTitle="TOTAL RESERVATIONS">
                            <div className="flex flex-col items-center justify-center h-full">
                                <p>10 reservations</p>
                                <p>Last 7 days</p>
                            </div>
                        </Card>
        
                        <Card cardTitle="LAB UTILIZATION RATE">
                            <div className="flex flex-col gap-2 text-left">
                                <p>72%</p>
                            </div>
                        </Card> 
                    </div>

                </div>

                <div>
                    <p className="text-xl text-left font-heading font-bold my-3">Manage Computer Labs</p>

                    <div className="flex items-start gap-5">
                        <div className="flex gap-3">
                            <input type="search" name="search" id="search" 
                                placeholder="Search Computer Lab" className="col-span-2 border-global p-2 rounded-lg font-sans"/>
                            <button className="col-span-1 border-glow py-2 px-4 rounded-lg font-heading font-bold">Filter</button>
                        </div>

                        <NavLink to="/create_lab">
                            <button className="col-span-1 border py-2 px-4 rounded-lg font-heading font-bold border-glow bg-glow hover:bg-pink-500">
                                Add New Lab
                            </button>
                        </NavLink>

                    </div>

                    <div className="my-5">
                        
                        { computerLabs.map((computerLab) => {
                            return (
                                <LabCard labName={computerLab.lab_name} 
                                    location={computerLab.location}
                                    capacity={computerLab.capacity}
                                    lab_id={computerLab.id}
                                    key={computerLab.id}>
                                        <p className="font-bold font-heading">{ `${computerLab.reservations.length} reservations` }</p>
                                    </LabCard>
                            )
                        }) }
                        
                    </div>

                </div>
        </div>
    )

}