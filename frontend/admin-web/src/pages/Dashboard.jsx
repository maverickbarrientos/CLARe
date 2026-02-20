import { PageTitle } from "../components/PageTitle";
import { Card } from "../components/Card";

export function Dashboard() {

    return (
        <div className="flex flex-col gap-10">
            <title>CLARe | Dashboard</title>

            <PageTitle pageTitle={"Dashboard"}/>

            <div className="grid grid-cols-3 gap-7">
                <Card cardTitle="MOST USED LAB">
                    <div className="flex flex-col items-center justify-center h-full">
                        <p>Computer Lab 7</p>
                        <p>3 reservations (Last 7 days)</p>
                    </div>
                </Card>

                <Card cardTitle="RESERVATIONS">
                    <div className="flex flex-col gap-2 text-left font-sans">
                        <div className="bg-medium-gray px-3 py-1 rounded-md">3 reserved</div>
                        <div className="bg-medium-gray px-3 py-1 rounded-md">2 in use</div>
                        <div className="bg-medium-gray px-3 py-1 rounded-md">1 cancelled</div>
                    </div>
                </Card>

                <Card cardTitle="ACTIVE RESERVATIONS" className="row-span-2">
                    <div className="flex flex-col gap-2 text-left">
                        Maverick Jade Barrientos
                    </div>
                </Card> 

                <Card cardTitle="COMPUTER LAB ANALYTICS" className="col-span-2">
                    
                </Card>
            </div>
            
        </div>
    )

}