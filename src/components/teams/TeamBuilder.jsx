import PokemonTypeBadge from "../commons/PokemonTypeBadge";

const TeamBuilder = ({
  selectedPokemon,
  teamName,
  setTeamName,
  showTeamBuilder,
  setShowTeamBuilder,
  removePokemonFromTeam,
  saveAsTeam,
  saveAsDraft,
  editMode = false,
  isEditingTeam = false,
}) => {
  return (
    <div className="bg-slate-800 rounded-xl p-6 mb-8 border border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-slate-100 flex items-center gap-2">
          <span className="text-2xl">⚔️</span>
          Tu Equipo ({selectedPokemon.length}/6)
        </h2>
        <button
          onClick={() => setShowTeamBuilder(!showTeamBuilder)}
          className="bg-slate-700 text-slate-300 px-4 py-2 rounded-lg hover:bg-slate-600 transition-colors"
        >
          {showTeamBuilder ? "Ocultar" : "Mostrar"} Equipo
        </button>
      </div>

      {showTeamBuilder && (
        <>
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Nombre del Equipo
            </label>
            <input
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="Ingresa el nombre de tu equipo..."
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {selectedPokemon.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {selectedPokemon.map((pokemon) => (
                <div
                  key={pokemon.id}
                  className="bg-slate-700 rounded-lg p-4 border border-slate-600"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={pokemon.image}
                      alt={pokemon.name}
                      className="w-12 h-12 object-contain"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-slate-100 capitalize">
                        {pokemon.name}
                      </h3>
                      <div className="flex gap-1 mt-1">
                        {pokemon.types.map((type, index) => (
                          <PokemonTypeBadge
                            key={index}
                            type={type}
                            size="small"
                          />
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={() => removePokemonFromTeam(pokemon.id)}
                      className="text-red-400 hover:text-red-300 p-1"
                      title="Eliminar del equipo"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-slate-400">
              <div className="text-4xl mb-2">👥</div>
              <p>No has seleccionado ningún Pokémon</p>
              <p className="text-sm">
                Haz clic en "Agregar" en cualquier Pokémon de abajo
              </p>
            </div>
          )}          {selectedPokemon.length > 0 && (
            <div className="flex gap-4 justify-center">
              {!editMode || !isEditingTeam ? (
                <button
                  onClick={saveAsDraft}
                  className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center gap-2"
                >
                  <span>📝</span>
                  {editMode ? 'Actualizar Borrador' : 'Guardar como Borrador'}
                </button>
              ) : null}
              
              <button
                onClick={saveAsTeam}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                <span>⚔️</span>
                {editMode 
                  ? (isEditingTeam ? 'Actualizar Equipo' : 'Promover a Equipo')
                  : 'Crear Equipo'
                }
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TeamBuilder;
