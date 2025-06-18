import { useNavigate } from "react-router-dom";
import PokemonTypeBadge from "../commons/PokemonTypeBadge";
import { useCustomAlerts } from "../ui/CustomAlert";

const TeamsGrid = ({ teams, onDelete }) => {
  const navigate = useNavigate();
  const { showConfirm, showSuccess, showError } = useCustomAlerts();

  const handleDelete = (team) => {
    const confirmMessage = `¿Estás seguro de que quieres eliminar el equipo "${team.name}"?`;
    
    showConfirm(
      confirmMessage,
      () => {
        try {
          onDelete(team.id);
          showSuccess(`Equipo "${team.name}" eliminado exitosamente`);
        } catch (error) {
          console.error("Error al eliminar el equipo:", error);
          showError("Error al eliminar el equipo");
        }
      },
      null,
      {
        description: "Esta acción no se puede deshacer",
      }
    );
  };

  if (teams.length === 0) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold text-slate-100 mb-8">Mis Equipos</h1>
        <div className="text-center py-16">
          <div className="text-6xl mb-4">⚔️</div>
          <h3 className="text-xl font-semibold text-slate-200 mb-2">
            No tienes equipos creados
          </h3>
          <p className="text-slate-400 mb-6">
            Crea tu primer equipo para comenzar a batallar
          </p>
          <button
            onClick={() => navigate("/teams/new")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
          >
            <span>✨</span>
            Crear Equipo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-100">Mis Equipos</h1>
          <p className="text-slate-400 mt-2">
            {teams.length} equipo(s) disponible(s)
          </p>
        </div>
        <button
          onClick={() => navigate("/teams/new")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
        >
          <span>+</span>
          Nuevo Equipo
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {teams.map((team) => (
          <div
            key={team.id}
            className="bg-slate-800 rounded-xl p-8 border border-slate-700 hover:border-slate-600 transition-colors min-w-0"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-100 mb-1">
                  {team.name}
                </h3>
                <p className="text-sm text-slate-400">
                  {team.pokemon.length}/6 Pokémon
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleDelete(team)}
                  className="p-2 text-red-400 hover:text-red-300 hover:bg-slate-700 rounded-lg transition-colors"
                  title="Eliminar equipo"
                >
                  🗑️
                </button>
              </div>
            </div>

            {/* Estadísticas de victorias y derrotas */}
            <div className="flex gap-4 mb-6 p-4 bg-slate-700/50 rounded-lg">
              <div className="text-center flex-1">
                <div className="text-xl font-bold text-green-400">
                  {team.wins}
                </div>
                <div className="text-xs text-slate-400 mt-1">Victorias</div>
              </div>
              <div className="text-center flex-1">
                <div className="text-xl font-bold text-red-400">
                  {team.losses}
                </div>
                <div className="text-xs text-slate-400 mt-1">Derrotas</div>
              </div>
              <div className="text-center flex-1">
                <div className="text-xl font-bold text-slate-300">
                  {team.wins + team.losses > 0
                    ? ((team.wins / (team.wins + team.losses)) * 100).toFixed(0) + "%"
                    : "0%"}
                </div>
                <div className="text-xs text-slate-400 mt-1">Ratio</div>
              </div>
            </div>

            {/* Lista de Pokémon */}
            {team.pokemon.length > 0 ? (
              <div className="space-y-4">
                <div className="text-sm font-medium text-slate-300">
                  Pokémon:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {team.pokemon.map((pokemon) => (
                    <div
                      key={pokemon.id}
                      className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors"
                    >
                      <img
                        src={pokemon.image}
                        alt={pokemon.name}
                        className="w-10 h-10 object-contain flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-slate-100 capitalize truncate mb-1">
                          {pokemon.name}
                        </div>
                        <div className="flex gap-1 flex-wrap">
                          {pokemon.types.slice(0, 2).map((type, index) => (
                            <PokemonTypeBadge
                              key={index}
                              type={type}
                              size="small"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {team.pokemon.length < 6 && (
                  <div className="text-xs text-slate-500 text-center mt-2">
                    {6 - team.pokemon.length} slot(s) disponible(s)
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-6 text-slate-400">
                <div className="text-2xl mb-2">👥</div>
                <p className="text-sm">Sin Pokémon</p>
                <p className="text-xs">Agrega Pokémon a tu equipo</p>
              </div>
            )}

            {/* Botón de acción */}
            <div className="mt-6 pt-4 border-t border-slate-700">
              <div className="flex gap-3">
                <button
                  onClick={() => navigate(`/combat?team=${team.id}`)}
                  className="flex-1 bg-green-600/20 text-green-400 py-3 px-4 rounded-lg hover:bg-green-600/30 transition-colors text-sm font-medium"
                >
                  Batallar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamsGrid;
