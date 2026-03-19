import { InputField } from "../shared/InputField"

export function ReservationForm ({ handleChange, onSubmit, form, children, submitLabel }) {

    return (
        <div>
            <form onSubmit={onSubmit} className="grid grid-cols-2 gap-4 w-3/4">
                {children}

                    <InputField inputTitle="Full Name *" handleChange={handleChange} name="full_name"
                    section="reservation_information" value={form.full_name} fieldType={"text"}
                    placeholder="John Doe"
                    />

                    <InputField inputTitle="Start Date *" handleChange={handleChange} name="start_date"
                        section="reservation_information" value={form.start_date}
                        fieldType={"datetime-local"}
                    />

                    <InputField inputTitle="End Date *" handleChange={handleChange} name="end_date"
                        section="reservation_information" value={form.end_date}
                        fieldType={"datetime-local"}
                    />

                    <InputField inputTitle="Email *" handleChange={handleChange} name="email"
                        section="reservation_information" value={form.email} fieldType={"text"}
                        placeholder="johndoe@example.com"
                    />

                    <InputField inputTitle="Department *" handleChange={handleChange} name="department"
                        section="reservation_information" value={form.department} fieldType={"text"}
                        placeholder="CITE"
                    />

                    <div>
                        <p className="font-heading mb-2">Status</p>
                        <select name="status" onChange={handleChange} value={form.status}
                            className="py-2 px-4 rounded-lg border-global font-sans w-full bg-black text-white font-heading">
                            <option value="pending">PENDING</option>
                            <option value="reserved">RESERVED</option>
                            <option value="in_use">IN USE</option>
                        </select>
                    </div>
                
                <div className="col-span-2">
                    <p className="font-heading mb-2">Reservation Description *</p>
                    <textarea name="reservation_description" section="reservation_information" className="py-2 px-4 rounded-lg border-global font-sans w-full resize-none" 
                        onChange={handleChange} placeholder="Enter reservation description" value={form.reservation_description}
                        rows={4}/>
                </div>

                
                <div className="col-span-2 flex justify-end gap-3">
                    <button className="rounded-lg bg-danger px-6 py-2 font-bold font-heading">Clear</button>
                    <button type="submit" className="rounded-lg bg-success font-heading px-4 py-2 font-bold">
                        { submitLabel }
                    </button>
                </div>
            </form>
        </div>
    )

}