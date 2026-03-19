import { InputField } from "../shared/InputField"

export function LabForm ({ handleSubmit, handleChange, labForm, loading, submitLabel }) {

    return (
        <div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="text-left">
                    <p className="text-xl font-bold font-heading mb-3">Lab Information</p>
                    
                    <div className="w-3/4">
                        <div className="grid grid-cols-2 gap-5 mb-5">
                            <InputField inputTitle="Computer Lab *" handleChange={handleChange} name="lab_name"
                                value={labForm.lab_name}
                                placeholder="Computer Lab 7" fieldType={"text"}/>
                            <InputField inputTitle="Capacity *" handleChange={handleChange} name="capacity"
                                value={labForm.capacity}
                                placeholder="67" fieldType={"text"}/>
                            <InputField inputTitle="Location *" handleChange={handleChange} name="location"
                                value={labForm.location}
                                placeholder="BED Building, 2nd Floor" fieldType={"text"}/>
                        </div>

                    </div>

                    <div className="flex justify-end w-3/4 gap-3">
                        <button className="rounded-lg bg-danger px-6 py-2 font-bold font-heading">Clear</button>
                        <button type="submit" className="rounded-lg bg-success font-heading px-4 py-2 font-bold"
                            disabled={loading}>{ submitLabel }</button>
                    </div>
                </div>
            </form>
        </div>
    )

}