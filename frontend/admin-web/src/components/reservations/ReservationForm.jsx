import { InputField } from "../shared/InputField"

export function ReservationForm ({ handleChange, onSubmit }) {

    return (
        <div>
            <form onSubmit={onSubmit} className="grid grid-cols-2 gap-4 w-3/4">
                <div className="col-span-1 flex flex-col gap-y-4">
                    <InputField inputTitle="Full Name *" handleChange={handleChange} name="full_name"
                    section="reservation_information" //value={form.full_name} fieldType={"text"}
                    placeholder="John Doe"
                    />

                    <InputField inputTitle="Start Date *" handleChange={handleChange} name="start_date"
                        section="reservation_information" //value={form.reservation_description}
                        fieldType={"datetime-local"}
                    />

                    
                    <div>
                        <p className="font-heading mb-2">Status</p>
                        <select name="status" onChange={handleChange}
                            className="py-2 px-4 rounded-lg border-global font-sans w-full bg-black text-white font-heading">
                            <option value="reserved">RESERVED</option>
                            <option value="in_use">IN USE</option>
                        </select>
                    </div>
                </div>

                <div className="col-span-1 flex flex-col gap-y-4">
                    <InputField inputTitle="Email *" handleChange={handleChange} name="email"
                        section="reservation_information" //value={form.email} fieldType={"text"}
                        placeholder="johndoe@example.com"
                    />

                    <InputField inputTitle="End Date *" handleChange={handleChange} name="end_date"
                        section="reservation_information" //value={form.reservation_description}
                        fieldType={"datetime-local"}
                    />
                </div>
                
                <div className="col-span-2">
                    <p className="font-heading mb-2">Reservation Description *</p>
                    <textarea className="py-2 px-4 rounded-lg border-global font-sans w-full resize-none" 
                        onChange={handleChange} placeholder="Enter reservation description"
                        rows={4}/>
                </div>

                
                <div className="col-span-2 flex justify-end gap-3">
                    <button className="rounded-lg bg-danger px-6 py-2 font-bold font-heading">Clear</button>
                    <button type="submit" className="rounded-lg bg-success font-heading px-4 py-2 font-bold">
                        Create
                    </button>
                </div>
            </form>
        </div>
    )

}