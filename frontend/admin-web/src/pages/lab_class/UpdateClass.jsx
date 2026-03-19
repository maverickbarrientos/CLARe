import { SubPageTitle } from "../../components/SubPageTitle"
import { UpdateClassForm } from "../../components/lab_class/UpdateClassForm"
import { useLabClass } from "../../hooks/lab_class/useLabClass"
import { Modal } from "../../components/shared/Modal";

export function UpdateClass () {

    const { labClass, loading } = useLabClass();

    if (loading) return <Modal type={"loading"} title={"Loading Computer Labs"} subTitle={"Please wait while we fetch laboratory data."} />

    return (

        <div>

            <SubPageTitle 
                to={"/"}
            />

            <UpdateClassForm 
                labClass={labClass}
                loading={loading}
            />

        </div>

    )

}