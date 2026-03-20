import { useState } from "react";
import { InputField } from "../components/shared/InputField";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Modal } from "../components/shared/Modal";
import logo from "../assets/CLARe.png";

export function Login() {

    const { login } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorModalOpen, setErrorModalOpen] = useState(false);

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await login(form.email, form.password);
            
            navigate("/");

        } catch (error) {
            console.log(error);
            setErrorModalOpen(true);
            setError("Invalid email or password");
        } finally {
            setLoading(false);
        }
    }

    return (
            <div className="grid grid-cols-2 w-full h-dvh">
        
            {/* Left panel */}
            <div className="col-span-1 border-r border-[#1a1a1a] relative flex flex-col justify-between p-14">
                
                {/* Orange right accent line */}
                <div className="absolute right-0 top-[10%] bottom-[10%] w-px bg-glow opacity-60" />

                {/* Logo */}
                <div>
                    <div className="w-40">
                        <img src={logo} alt="CLARe Logo" className="w-full" />
                    </div>
                    <p className="font-heading text-left text-[10px] font-semibold tracking-[.08em] uppercase text-[#444] mt-2">
                        CITE &mdash; Computer Lab Reservation
                    </p>
                </div>

                {/* Middle */}
                <div className="text-left">
                    <h1 className="font-heading text-3xl font-bold text-white leading-tight">
                        Manage labs.<br />Control access.<br />
                        <span>Stay in charge.</span>
                    </h1>
                    <p className="font-sans text-sm mt-4 leading-relaxed max-w-xs">
                        A centralized platform for managing computer laboratory reservations, class schedules, and access control.
                    </p>
                </div>

                {/* Footer */}
                <p className="font-heading text-[10px] tracking-widest text-[#2a2a2a] uppercase">
                    Authorized Personnel Only
                </p>
            </div>

            {/* Right panel — form */}
            <div className="col-span-1 flex flex-col justify-center px-14">
                <p className="font-heading text-[10px] font-semibold tracking-[.18em] uppercase mb-6">
                    Admin Portal
                </p>
                <h2 className="font-heading text-2xl font-semibold text-white mb-8">
                    Sign in to continue
                </h2>

                { errorModalOpen && <Modal type={"error"} title={"Something went wrong"} subTitle={error} onClose={() => setErrorModalOpen(false)} /> }

                

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div>
                        <label className="font-heading text-[10px] font-medium tracking-[.12em] uppercase text-[#555] block mb-2">
                            Email
                        </label>
                        <input type="email" name="email"
                            value={form.email} onChange={handleChange}
                            placeholder="you@cite.edu.ph"
                            className="w-full bg-transparent border-b border-[#222] focus:border-glow text-white font-sans text-sm py-2 outline-none placeholder:text-[#2e2e2e] transition-colors"
                        />
                    </div>

                    <div>
                        <label className="font-heading text-[10px] font-medium tracking-[.12em] uppercase text-[#555] block mb-2">
                            Password
                        </label>
                        <input type="password" name="password"
                            value={form.password} onChange={handleChange}
                            placeholder="••••••••"
                            className="w-full bg-transparent border-b border-[#222] focus:border-glow text-white font-sans text-sm py-2 outline-none placeholder:text-[#2e2e2e] transition-colors"
                        />
                    </div>

                    <button type="submit" disabled={loading}
                        className="bg-glow rounded-xl font-heading font-bold text-xs tracking-[.14em] uppercase py-3 mt-2 hover:opacity-90 transition-opacity">
                        {loading ? "Signing in..." : "Sign In"}
                    </button>
                </form>

                <div className="flex items-center gap-3 mt-8">
                    <div className="flex-1 h-px bg-[#111]" />
                    <span className="font-heading text-[10px] tracking-widest text-[#2a2a2a]">CLARe v1.0</span>
                    <div className="flex-1 h-px bg-[#111]" />
                </div>
            </div>
        </div>
    )
}