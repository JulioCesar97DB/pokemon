import { useNavigate } from "react-router-dom";
import PokemonTypeBadge from "../commons/PokemonTypeBadge";
import { useCustomAlerts } from "../ui/CustomAlert";

const DraftsGrid = ({ drafts, onDelete, onPromote }) => {
  const navigate = useNavigate();
  const { showConfirm, showSuccess, showError } = useCustomAlerts();

  const handleEdit = (draft) => {
    navigate("/teams/new", {
      state: {
        editMode: true,
        itemData: draft,
        isTeam: false,
      },
    });
  };

  const handlePromote = (draft) => {
    const confirmMessage = `¿Quieres promover el borrador "${draft.name}" a equipo? Esto lo moverá a tus equipos activos.`;

    showConfirm(
      confirmMessage,
      () => {
        try {
          onPromote(draft.id);
          showSuccess(
            `¡Borrador "${draft.name}" promovido a equipo exitosamente!`
          );
        } catch (error) {
          console.error("Error al promover el borrador:", error);
          showError("Error al promover el borrador");
        }
      },
      null,
      {
        description: "Esta acción no se puede deshacer",
      }
    );
  };

  const handleDelete = (draft) => {
    const confirmMessage = `¿Estás seguro de que quieres eliminar el borrador "${draft.name}"?`;

    showConfirm(
      confirmMessage,
      () => {
        try {
          onDelete(draft.id);
          showSuccess(`Borrador "${draft.name}" eliminado exitosamente`);
        } catch (error) {
          console.error("Error al eliminar:", error);
          showError("Error al eliminar");
        }
      },
      null,
      {
        description: "Esta acción no se puede deshacer",
      }
    );
  };

  if (drafts.length === 0) {
    return (
      <div className="p-6 h-full flex flex-col">
        <h1 className="text-3xl font-bold text-slate-100 mb-8">
          Mis Borradores
        </h1>
        <div className="flex flex-col items-center justify-center text-center h-full py-16">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-xl font-semibold text-slate-200 mb-2">
            No tienes borradores guardados
          </h3>
          <p className="text-slate-400 mb-6">
            Guarda tus ideas de equipos como borradores
          </p>
          <button
            onClick={() => navigate("/teams/new")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
          >
            <span>✨</span>
            Crear Borrador
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-100">Mis Borradores</h1>
          <p className="text-slate-400 mt-2">
            {drafts.length} borrador(es) disponible(s)
          </p>
        </div>
        <button
          onClick={() => navigate("/teams/new")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
        >
          <span>+</span>
          Nuevo Borrador
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {drafts.map((draft) => (
          <div
            key={draft.id}
            className="bg-slate-800 rounded-xl p-8 border border-slate-700 hover:border-slate-600 transition-colors min-w-0"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-100 mb-1">
                  {draft.name}
                </h3>
                <p className="text-sm text-slate-400">
                  {draft.pokemon.length}/6 Pokémon
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(draft)}
                  className="p-2 text-blue-400 hover:text-blue-300 hover:bg-slate-700 rounded-lg transition-colors"
                  title="Editar borrador"
                >
                  ✏️
                </button>

                <button
                  onClick={() => handlePromote(draft)}
                  className="p-2 text-green-400 hover:text-green-300 hover:bg-slate-700 rounded-lg transition-colors"
                  title="Promover a equipo"
                >
                  ⬆️
                </button>

                <button
                  onClick={() => handleDelete(draft)}
                  className="p-2 text-red-400 hover:text-red-300 hover:bg-slate-700 rounded-lg transition-colors"
                  title="Eliminar"
                >
                  🗑️
                </button>
              </div>
            </div>

            {draft.pokemon.length > 0 ? (
              <div className="space-y-4">
                <div className="text-sm font-medium text-slate-300">
                  Pokémon:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {draft.pokemon.map((pokemon) => (
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

                {draft.pokemon.length < 6 && (
                  <div className="text-xs text-slate-500 text-center mt-2">
                    {6 - draft.pokemon.length} slot(s) disponible(s)
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-6 text-slate-400">
                <div className="text-2xl mb-2">👥</div>
                <p className="text-sm">Sin Pokémon</p>
                <p className="text-xs">Haz clic en editar para agregar</p>
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-slate-700">
              <div className="flex gap-3">
                <button
                  onClick={() => handleEdit(draft)}
                  className="flex-1 bg-blue-600/20 text-blue-400 py-3 px-4 rounded-lg hover:bg-blue-600/30 transition-colors text-sm font-medium"
                >
                  Editar
                </button>
                <button
                  onClick={() => handlePromote(draft)}
                  className="flex-1 bg-green-600/20 text-green-400 py-3 px-4 rounded-lg hover:bg-green-600/30 transition-colors text-sm font-medium"
                >
                  Promover
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DraftsGrid;
