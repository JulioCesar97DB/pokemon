import { Link, useLocation } from "react-router-dom";

export const Navbar = () => {
  const { pathname } = useLocation();

  return (
    <nav className="absolute w-full bg-blue-900">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-3 text-xl font-bold">
          <img src="/pokemon.svg" alt="pokeball" /> Pokemon Combat
        </div>
        <div className="flex space-x-1 md:space-x-10">
          <Link
            to="/"
            className={`flex items-center px-6 py-2 rounded-xl transition-all duration-200 ${
              pathname === "/"
                ? "bg-blue-700 text-white"
                : "hover:bg-blue-800 hover:text-blue-100"
            }`}
          >
            Inicio
          </Link>
          <Link
            to="/teams"
            className={`flex items-center px-6 py-2 rounded-xl transition-all duration-200 ${
              pathname.includes("/teams")
                ? "bg-blue-700 text-white"
                : "hover:bg-blue-800 hover:text-blue-100"
            }`}
          >
            Equipos
          </Link>
          <Link
            to="/combat"
            className={`flex items-center px-6 py-2 rounded-xl transition-all duration-200 ${
              pathname.includes("/combat")
                ? "bg-blue-700 text-white"
                : "hover:bg-blue-800 hover:text-blue-100"
            }`}
          >
            Combates
          </Link>
        </div>
      </div>
    </nav>
  );
};
