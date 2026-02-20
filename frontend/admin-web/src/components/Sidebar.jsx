import { NavLink } from "react-router-dom";
import logo from "../assets/CLARe.png";

export function Sidebar() {
  return (
    <aside className="flex flex-col w-min gap-5 bg-dark-gray h-dvh py-10 px-15 border-r-glow">

      <div className="w-30 mb-7">
        <img src={logo} alt="CLARe Logo" className="w-full"/>
      </div>

    <h5 className="text-left text-secondary font-heading text-sm">Main Menu</h5>

      <nav className="flex flex-col gap-2 text-left font-heading w-max ">
        <NavLink to="/">
          Dashboard
        </NavLink>
        
        <NavLink to="/reservations">
          Reservations
        </NavLink>
        
        <NavLink to="/users">
          Users
        </NavLink>
        
        <NavLink to="/computer_lab">
          Computer Labs
        </NavLink>

      </nav>

    </aside>
  );
}
