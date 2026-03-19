import { InputField } from "../../components/shared/InputField"
import { Card } from "../Card";

export function ClassForm ({ classForm, handleChange, handleSubmit, loading, submitLabel, children }) {

    return (
        
        <div>
            {children}
            <div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="text-left">
                        <p className="text-xl font-bold font-heading my-2">Class Information</p>
                        
                        <div className="w-3/4">
                            <div className="grid grid-cols-2 gap-5 mb-5">
                                <InputField inputTitle="Subject *" handleChange={handleChange} name="subject"
                                    value={classForm.subject}
                                    placeholder="ITE 400" fieldType={"text"}/>
                                <InputField inputTitle="Teacher *" handleChange={handleChange} name="teacher"
                                    value={classForm.teacher}
                                    placeholder="Reuben Mallorca" fieldType={"text"}/>
                            </div>

                            <div className="grid grid-cols-2 gap-5 mb-5">
                            <InputField inputTitle="Section *" handleChange={handleChange} name="section"
                                    value={classForm.section}
                                    placeholder="BSIT 69" fieldType={"text"}/>
                                <InputField inputTitle="Department *" handleChange={handleChange} name="department"
                                    value={classForm.department}
                                    placeholder="BSIT gwapo" fieldType={"text"}/>
                            </div>

                            <div className="grid grid-cols-2 gap-5 mb-5">
                                <InputField inputTitle="Start Time *" handleChange={handleChange} name="start_time"
                                    value={classForm.start_time}
                                    placeholder="BSIT gwapo" fieldType={"time"}/>
                                <InputField inputTitle="End Time *" handleChange={handleChange} name="end_time"
                                    value={classForm.end_time}
                                    placeholder="BSIT gwapo" fieldType={"time"}/>
                                <InputField inputTitle="Day *" handleChange={handleChange} name="day"
                                        value={classForm.day}
                                        placeholder="BSIT 69" fieldType={"text"}/>
                            </div>
                        </div>

                        <div className="flex justify-end w-3/4 gap-3">
                            <button className="rounded-lg bg-danger px-6 py-2 font-bold font-heading">Clear</button>
                            <button type="submit" className="rounded-lg bg-success font-heading px-4 py-2 font-bold"
                                disabled={loading}>{submitLabel}</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>


    )

}