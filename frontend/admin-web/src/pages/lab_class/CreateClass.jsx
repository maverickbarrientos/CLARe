import { SubPageTitle } from "../../components/SubPageTitle"
import { CreateClassForm } from "../../components/lab_class/CreateClassForm";

export function CreateClass () {

    return (

        <div>
            <SubPageTitle to={"/choose_lab"}
                label={"Back to Choose Lab"}
                title={"Create Class"}
                subTitle={"Fill in the details below to schedule a new class for this laboratory."}
            />

            <div>


            <CreateClassForm />


            </div>
        </div>

    )

}