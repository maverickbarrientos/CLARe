import { InputField } from "../shared/InputField"

export function UserForm({ form, handleChange, onSubmit, loading, submitLabel }) {

    return (

        <div>
            <form onSubmit={onSubmit} className="flex flex-col gap-6">
                <div className="text-left">
                    <p className="text-xl font-heading font-bold my-3">User Type</p>

                    <div className="flex gap-4">
                        <label className={`flex items-center gap-2 cursor-pointer border px-4 py-2 rounded-lg font-bold font-heading text-disabled ${form.user.is_superuser ? "border-glow text-glow" : "border"}`}>
                            <input 
                                type="radio" 
                                name="is_superuser" 
                                value={form.user.is_superuser}
                                checked={form.user.is_superuser === true}
                                onChange={() => handleChange({ target: { name: "is_superuser", value: true }}, "user")}
                                hidden={true}
                            />
                            Admin
                        </label>

                        <label className={`flex items-center gap-2 cursor-pointer border px-4 py-2 rounded-lg font-bold font-heading text-disabled ${!form.user.is_superuser ? "border-glow text-glow" : "border"}`}>
                            <input 
                                type="radio" 
                                name="is_superuser" 
                                value={form.user.is_superuser}
                                checked={form.user.is_superuser === false}
                                onChange={() => handleChange({ target: { name: "is_superuser", value: false }}, "user")}
                                hidden={true}
                            />
                            User
                        </label>
                    </div>
                </div>

            <div className="text-left">
                <p className="text-xl font-bold font-heading mb-3">Personal Information</p>
                
                <div className="w-3/4">
                    <div className="grid grid-cols-2 gap-5 mb-5">
                        <InputField inputTitle="First Name *" handleChange={handleChange} name="first_name"
                                    section="user_information" value={form.user_information.first_name}
                                    placeholder="John" fieldType={"text"}/>
                        <InputField inputTitle="Last Name *" handleChange={handleChange} name="last_name"
                                    section="user_information" value={form.user_information.last_name}
                                    placeholder="Doe" fieldType={"text"}/>
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                        <InputField inputTitle="Email *" handleChange={handleChange} name="email"
                                    section="user" value={form.user.email}
                                    placeholder="johndoe@example.com" fieldType={"text"}/>
                        
                        <InputField inputTitle="Password *" handleChange={handleChange} name="password"
                                    section="user" value={form.user.password} fieldType={"password"}/>
                        
                        <InputField inputTitle="Department *" handleChange={handleChange} name="department"
                                    section="user_information" value={form.user_information.department}
                                    placeholder="BSIT" fieldType={"text"}/>
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