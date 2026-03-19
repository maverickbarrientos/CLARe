import { useComputerLab } from "../../hooks/computer_labs/useComputerLab"
import { UpdateLabForm } from "../../components/computer_labs/UpdateLabForm";
import { SubPageTitle } from "../../components/SubPageTitle";
import { Modal } from "../../components/shared/Modal";

export function UpdateLab () {

    const { computerLab, error, loading } = useComputerLab();

    if (loading) return <Modal type={"loading"} title={"Loading Computer Labs"} subTitle={"Please wait while we fetch laboratory data."} /> 
    if (error) return <p>{error}</p>
    console.log(computerLab)

    return (
        
        <div>

            <SubPageTitle to={`/view_lab/${computerLab.id}`}
                label={"Back to View Lab"}
                title={"Update Lab"}
                subTitle={"Update the details of this computer laboratory."}
            />
                        
            <UpdateLabForm 
                computerLab={computerLab}
            />
        </div>

    )

}