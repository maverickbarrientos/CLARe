import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/CLARe.png";
import { useAuth } from "../hooks/useAuth";

const navItems = [
    { to: "/",             label: "Dashboard"     },
    { to: "/lab_class",    label: "Class"         },
    { to: "/reservations", label: "Reservations"  },
    { to: "/users",        label: "Users"         },
    { to: "/computer_lab", label: "Computer Labs" },
];

export function Sidebar() {

    const { admin, logout } = useAuth();
    const [popupOpen, setPopupOpen] = useState(false);
    const popupRef = useRef(null);

    const initials = admin?.email?.slice(0, 2).toUpperCase() ?? "AD";

    // Close popup when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (popupRef.current && !popupRef.current.contains(e.target)) {
                setPopupOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <aside className="flex flex-col w-min gap-5 bg-dark-gray h-dvh py-10 pl-7 pr-5 border-r-glow">

            <div className="w-30 mb-7">
                <img src={logo} alt="CLARe Logo" className="w-full" />
            </div>

            <h5 className="text-left text-secondary font-heading text-sm">Main Menu</h5>

            <nav className="flex flex-col gap-2 text-left font-heading w-max">
                {navItems.map(({ to, label }) => (
                    <NavLink
                        key={to}
                        to={to}
                        end={to === "/"}
                        className={({ isActive }) =>
                            `rounded-lg transition-colors p-2 ${
                                isActive
                                    ? "bg-medium-gray text-white"
                                    : "text-secondary hover:bg-medium-gray/50 hover:text-white"
                            }`
                        }
                    >
                        {label}
                    </NavLink>
                ))}
            </nav>

            <div className="mt-auto relative" ref={popupRef}>

                {/* POPUP */}
                {popupOpen && (
                    <div className="absolute bottom-16 left-0 w-full bg-dark-gray border-global rounded-2xl p-4 flex flex-col gap-3">
                        <div className="flex flex-col gap-1">
                            <p className="text-white font-heading font-bold text-sm">{admin?.email ?? "—"}</p>
                            <p className="text-secondary font-sans text-xs capitalize">{admin?.role ?? "Admin"}</p>
                        </div>
                        <button
                            onClick={logout}
                            className="w-full py-2 rounded-lg font-heading font-bold bg-danger text-white text-sm"
                        >
                            Logout
                        </button>
                    </div>
                )}

                {/* TRIGGER */}
                <button
                    onClick={() => setPopupOpen((prev) => !prev)}
                    className="border-t border-[#1A1A1A] pt-5 flex items-center gap-3 w-max hover:opacity-80 transition-opacity"
                >
                    <div className="w-9 h-9 rounded-full bg-glow flex items-center justify-center shrink-0">
                        <span className="text-black font-heading font-bold text-xs">{initials}</span>
                    </div>
                    <div className="flex flex-col text-left">
                        <p className="text-white font-heading font-bold text-sm">{admin?.email ?? "—"}</p>
                        <p className="text-secondary font-sans text-xs capitalize">{admin?.role ?? "Admin"}</p>
                    </div>
                </button>

            </div>

        </aside>
    );
}