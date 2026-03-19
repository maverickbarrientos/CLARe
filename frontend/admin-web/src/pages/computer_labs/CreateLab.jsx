import { SubPageTitle } from "../../components/SubPageTitle"
import { CreateLabForm } from "../../components/computer_labs/CreateLabForm"

export function CreateLab () {

    return (

        <div>
            
            <SubPageTitle to={"/computer_lab"}
                label={"Back to Computer Labs"}
                title={"Create Lab"}
                subTitle={"Fill in the details below to register a new computer laboratory."}
            />

            <CreateLabForm />

        </div>

    )

}