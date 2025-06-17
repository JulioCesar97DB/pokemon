import { NavLink } from "react-router";
import { useTeamsStore } from "../../store/teamsStore";

export const TeamsSidebar = () => {
  const { teams, drafts } = useTeamsStore();
  return (
    <div className="w-64 bg-slate-800 border-r border-slate-700 flex flex-col">
      <div className="p-6 border-b border-slate-700/50">
        <h2 className="text-lg font-bold text-slate-100 flex items-center gap-3">
          <span className="text-2xl">⚔️</span>
          Gestión de Equipos
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Administra tus equipos Pokémon
        </p>
      </div>

      <nav className="flex-1 p-4">
        <div className="space-y-4">
          <NavLink
            to="/teams/new"
            className={({ isActive }) =>
              `w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? "bg-green-600 text-white shadow-lg shadow-green-600/20"
                  : "text-slate-300 hover:text-white hover:bg-green-700/30 hover:shadow-md"
              }`
            }
          >
            <span className="text-xl">✨</span>
            <div className="flex-1">
              <div className="font-medium">Nuevo Equipo</div>
              <div className="text-xs opacity-70">Crear equipo</div>
            </div>
            <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
              <span className="text-xs font-bold">+</span>
            </div>
          </NavLink>
          <NavLink
            to="/teams"
            end
            className={({ isActive }) =>
              `w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                  : "text-slate-300 hover:text-white hover:bg-slate-700/50"
              }`
            }
          >
            <span className="text-xl">👥</span>
            <div className="flex-1">
              <div className="font-medium">Mis Equipos</div>
              <div className="text-xs opacity-70">Ver todos los equipos</div>
            </div>
          </NavLink>

          <NavLink
            to="/teams/drafts"
            className={({ isActive }) =>
              `w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? "bg-orange-600 text-white shadow-lg shadow-orange-600/20"
                  : "text-slate-300 hover:text-white hover:bg-slate-700/50"
              }`
            }
          >
            <span className="text-xl">📝</span>
            <div className="flex-1">
              <div className="font-medium">Borradores</div>
              <div className="text-xs opacity-70">Equipos en progreso</div>
            </div>
          </NavLink>
        </div>
        <div className="my-6 border-t border-slate-700/50"></div>{" "}
        <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/30">
          <div className="text-sm font-medium text-slate-300 mb-2">
            Estadísticas
          </div>{" "}
          <div className="space-y-2 text-xs text-slate-400">
            <div className="flex justify-between">
              <span>Equipos:</span>
              <span className="text-blue-400 font-medium">{teams.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Borradores:</span>
              <span className="text-orange-400 font-medium">
                {drafts.length}
              </span>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};
