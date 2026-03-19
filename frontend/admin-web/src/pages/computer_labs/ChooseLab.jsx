import { LabCard } from "../../components/computer_labs/LabCard"
import { SubPageTitle } from "../../components/SubPageTitle"
import { useComputerLabs } from "../../hooks/computer_labs/useComputerLabs"
import { Modal } from "../../components/shared/Modal";

export function ChooseLab () {

    const { computerLabs, error, loading } = useComputerLabs();


    console.log(computerLabs);

    return (
        <div>
            <SubPageTitle to="/reservations" label="Back to Reservations"
                          title="Choose a Lab"
                          subTitle="Select a computer lab to proceed with your reservation"
            />

            { loading && <Modal type={"loading"} title={"Loading Computer Labs"} subTitle={"Please wait while we fetch laboratory data."} /> }
            
            <div>
                { computerLabs.map((computerLab) => {
                    return (
                        <LabCard labName={computerLab.lab_name} 
                            location={computerLab.location}
                            capacity={computerLab.capacity}
                            lab_id={computerLab.id}
                            key={computerLab.id}
                        />
                    )
                }) }
            </div>

        </div>
    )

}