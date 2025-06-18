const BattleArena = ({ team1, team2 }) => {
  return (
    <div className="text-center space-y-8">
      <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
        <h2 className="text-3xl font-bold text-slate-100 mb-6">
          🥊 Batalla en Progreso
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="text-center">
            <div className="bg-blue-600/20 rounded-lg p-4 mb-4">
              <h3 className="text-xl font-bold text-blue-400 mb-2">
                🔵 {team1.name}
              </h3>
              <div className="flex justify-center gap-2 flex-wrap">
                {team1.pokemon.slice(0, 6).map((pokemon, index) => (
                  <img
                    key={index}
                    src={pokemon.image}
                    alt={pokemon.name}
                    className="w-12 h-12 object-contain"
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="text-6xl mb-4 animate-pulse">⚔️</div>
            <div className="text-3xl font-bold text-slate-100 mb-2">VS</div>
            <div className="text-slate-400">Los Pokémon están luchando...</div>
          </div>

          <div className="text-center">
            <div className="bg-red-600/20 rounded-lg p-4 mb-4">
              <h3 className="text-xl font-bold text-red-400 mb-2">
                🔴 {team2.name}
              </h3>
              <div className="flex justify-center gap-2 flex-wrap">
                {team2.pokemon.slice(0, 6).map((pokemon, index) => (
                  <img
                    key={index}
                    src={pokemon.image}
                    alt={pokemon.name}
                    className="w-12 h-12 object-contain"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex justify-center items-center gap-2 mb-4">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
            <div
              className="w-3 h-3 bg-red-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="w-3 h-3 bg-green-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>
          <p className="text-slate-400">Calculando resultados de batalla...</p>
        </div>
      </div>
    </div>
  );
};

export default BattleArena;
