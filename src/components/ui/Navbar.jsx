import { NavLink } from "react-router-dom";

export const Navbar = () => {
  const getLinkClasses = ({ isActive }) => 
    `flex items-center px-6 py-2 rounded-xl transition-all duration-200 ${
      isActive
        ? "bg-blue-700 text-white"
        : "hover:bg-blue-800 hover:text-blue-100"
    }`;

  return (
    <nav className="absolute w-full bg-blue-900">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-3 text-xl font-bold">
          <img src="/pokemon.svg" alt="pokeball" /> Pokemon Combat
        </div>
        <div className="flex space-x-1 md:space-x-10">
          <NavLink
            to="/"
            className={getLinkClasses}
            end
          >
            Inicio
          </NavLink>
          <NavLink
            to="/teams"
            className={getLinkClasses}
          >
            Equipos
          </NavLink>
          <NavLink
            to="/combat"
            className={getLinkClasses}
          >
            Combates
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
