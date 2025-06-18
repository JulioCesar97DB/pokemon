const TeamSelector = ({
  teams,
  selectedTeam1,
  selectedTeam2,
  onSelectTeam1,
  onSelectTeam2,
  onStartBattle,
}) => {
  const availableTeams = teams.filter((team) => team.pokemon.length > 0);

  if (availableTeams.length < 2) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">⚔️</div>
        <h3 className="text-xl font-semibold text-slate-200 mb-2">
          No hay suficientes equipos para batallar
        </h3>
        <p className="text-slate-400 mb-6">
          Necesitas al menos 2 equipos con Pokémon para poder batallar
        </p>
        <button
          onClick={() => (window.location.href = "/teams/new")}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
        >
          <span>✨</span>
          Crear Equipo
        </button>
      </div>
    );
  }
  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row gap-6 items-center">
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 flex-1 w-full">
          <h2 className="text-2xl font-bold text-slate-100 mb-4 flex items-center gap-2">
            <span className="text-blue-400">🔵</span>
            Equipo 1
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availableTeams.map((team) => (
              <div
                key={team.id}
                onClick={() => onSelectTeam1(team)}
                className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                  selectedTeam1?.id === team.id
                    ? "bg-blue-600/30 border-2 border-blue-500"
                    : selectedTeam2?.id === team.id
                    ? "bg-slate-700/50 border border-slate-600 opacity-50 cursor-not-allowed"
                    : "bg-slate-700/50 border border-slate-600 hover:bg-slate-700 hover:border-slate-500"
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-slate-100">{team.name}</h3>
                  <span className="text-sm text-slate-400">
                    {team.pokemon.length}/6
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-3">
                  {team.pokemon.slice(0, 6).map((pokemon, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <img
                        src={pokemon.image}
                        alt={pokemon.name}
                        className="w-8 h-8 object-contain mb-1"
                      />
                      <span className="text-xs text-slate-300 capitalize truncate w-full text-center">
                        {pokemon.name}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between text-xs text-slate-400">
                  <span>V: {team.wins}</span>
                  <span>D: {team.losses}</span>
                  <span>
                    {team.wins + team.losses > 0
                      ? `${(
                          (team.wins / (team.wins + team.losses)) *
                          100
                        ).toFixed(0)}%`
                      : "0%"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-shrink-0 text-center lg:mx-4">
          <div className="text-4xl lg:text-6xl text-slate-600 mb-2">⚔️</div>
          <div className="text-xl lg:text-2xl font-bold text-slate-400">VS</div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 flex-1 w-full">
          <h2 className="text-2xl font-bold text-slate-100 mb-4 flex items-center gap-2">
            <span className="text-red-400">🔴</span>
            Equipo 2
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availableTeams.map((team) => (
              <div
                key={team.id}
                onClick={() => onSelectTeam2(team)}
                className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                  selectedTeam2?.id === team.id
                    ? "bg-red-600/30 border-2 border-red-500"
                    : selectedTeam1?.id === team.id
                    ? "bg-slate-700/50 border border-slate-600 opacity-50 cursor-not-allowed"
                    : "bg-slate-700/50 border border-slate-600 hover:bg-slate-700 hover:border-slate-500"
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-slate-100">{team.name}</h3>
                  <span className="text-sm text-slate-400">
                    {team.pokemon.length}/6
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-3">
                  {team.pokemon.slice(0, 6).map((pokemon, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <img
                        src={pokemon.image}
                        alt={pokemon.name}
                        className="w-8 h-8 object-contain mb-1"
                      />
                      <span className="text-xs text-slate-300 capitalize truncate w-full text-center">
                        {pokemon.name}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between text-xs text-slate-400">
                  <span>V: {team.wins}</span>
                  <span>D: {team.losses}</span>
                  <span>
                    {team.wins + team.losses > 0
                      ? `${(
                          (team.wins / (team.wins + team.losses)) *
                          100
                        ).toFixed(0)}%`
                      : "0%"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={onStartBattle}
          disabled={
            !selectedTeam1 ||
            !selectedTeam2 ||
            selectedTeam1.id === selectedTeam2.id
          }
          className="bg-gradient-to-r from-red-600 to-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-red-700 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 mx-auto"
        >
          <span className="text-2xl">⚔️</span>
          ¡COMENZAR BATALLA!
          <span className="text-2xl">⚔️</span>
        </button>

        {selectedTeam1 && selectedTeam2 && (
          <p className="text-slate-400 mt-4">
            {selectedTeam1.name} vs {selectedTeam2.name}
          </p>
        )}
      </div>
    </div>
  );
};

export default TeamSelector;
