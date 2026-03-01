
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
                        <div>
                            <p className="font-heading">First Name *</p>
                            <input type="text" name="first_name" className="py-2 px-4 rounded-lg border-global font-sans w-full" 
                                onChange={(e) => handleChange(e, "user_information")}
                                value={form.user_information.first_name}/>
                        </div>
                        <div>
                            <p className="font-heading">Last Name *</p>
                            <input type="text" name="last_name" className="py-2 px-4 rounded-lg border-global font-sans w-full" 
                                onChange={(e) => handleChange(e, "user_information")}
                                value={form.user_information.last_name}/>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                        <div>
                            <p className="font-heading">Email *</p>
                            <input type="text" name="email" className="py-2 px-4 rounded-lg border-global font-sans w-full" 
                                onChange={(e) => handleChange(e, "user")}
                                value={form.user.email}/>
                        </div>
                        
                        <div>
                            <p className="font-heading">Password *</p>
                            <input type="password" name="password" className="py-2 px-4 rounded-lg border-global font-sans w-full" 
                                onChange={(e) => handleChange(e, "user")} 
                                value={form.user.password}/>
                        </div>

                        <div>
                            <p className="font-heading">Department *</p>
                            <input type="text" name="department" className="py-2 px-4 rounded-lg border-global font-sans w-full" 
                                onChange={(e) => handleChange(e, "user_information")}
                                value={form.user_information.department}/>
                        </div>
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