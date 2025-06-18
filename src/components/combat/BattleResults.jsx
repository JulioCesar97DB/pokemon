import { useState } from "react";
import PokemonTypeBadge from "../commons/PokemonTypeBadge";

const BattleResults = ({ results, onStartNewBattle, onReset }) => {
  const [showDetailedRounds, setShowDetailedRounds] = useState(false);
  const {
    team1,
    team2,
    rounds,
    team1Wins,
    team2Wins,
    draws,
    overallWinner,
    isDraw,
    totalRealBattles,
    team1ExtraPokemon,
    team2ExtraPokemon,
  } = results;

  return (
    <div className="space-y-8">
      <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
        {" "}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-slate-100 mb-2">
            🏆 Resultado de la Batalla
          </h2>
          {isDraw ? (
            <p className="text-2xl text-yellow-400 font-bold">¡EMPATE!</p>
          ) : (
            <p className="text-2xl font-bold">
              <span
                className={
                  overallWinner?.id === team1.id
                    ? "text-blue-400"
                    : "text-red-400"
                }
              >
                🎉 ¡{overallWinner?.name} es el ganador!
              </span>
            </p>
          )}{" "}
          <p className="text-slate-400 mt-2">
            {totalRealBattles} batallas reales ejecutadas
            {draws > 0 && (
              <span className="block text-sm text-yellow-400 mt-1">
                {draws} empate{draws > 1 ? "s" : ""}
              </span>
            )}
            {(team1ExtraPokemon > 0 || team2ExtraPokemon > 0) && (
              <span className="block text-sm text-slate-500 mt-1">
                {team1ExtraPokemon > 0 &&
                  `${team1.name}: ${team1ExtraPokemon} Pokémon sin enfrentar`}
                {team1ExtraPokemon > 0 && team2ExtraPokemon > 0 && " • "}
                {team2ExtraPokemon > 0 &&
                  `${team2.name}: ${team2ExtraPokemon} Pokémon sin enfrentar`}
              </span>
            )}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div
            className={`bg-slate-700/50 rounded-lg p-6 border-2 ${
              overallWinner?.id === team1.id
                ? "border-blue-500"
                : "border-slate-600"
            }`}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🔵</span>
              <h3 className="text-xl font-bold text-slate-100">{team1.name}</h3>
              {overallWinner?.id === team1.id && (
                <span className="text-2xl">👑</span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">
                  {team1Wins}
                </div>
                <div className="text-sm text-slate-400">Pokémon con vida</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-400">
                  {team2Wins}
                </div>
                <div className="text-sm text-slate-400">
                  Pokémon debilitados
                </div>
              </div>
            </div>
            <div className="text-center mb-4">
              <div className="text-lg font-semibold text-slate-300">
                Ratio:{" "}
                {totalRealBattles > 0
                  ? ((team1Wins / totalRealBattles) * 100).toFixed(0)
                  : 0}
                %
              </div>
            </div>
          </div>

          <div
            className={`bg-slate-700/50 rounded-lg p-6 border-2 ${
              overallWinner?.id === team2.id
                ? "border-red-500"
                : "border-slate-600"
            }`}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🔴</span>
              <h3 className="text-xl font-bold text-slate-100">{team2.name}</h3>
              {overallWinner?.id === team2.id && (
                <span className="text-2xl">👑</span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">
                  {team2Wins}
                </div>
                <div className="text-sm text-slate-400">Pokémon con vida</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-400">
                  {team1Wins}
                </div>
                <div className="text-sm text-slate-400">
                  Pokémon debilitados
                </div>
              </div>
            </div>
            <div className="text-center mb-4">
              <div className="text-lg font-semibold text-slate-300">
                Ratio:{" "}
                {totalRealBattles > 0
                  ? ((team2Wins / totalRealBattles) * 100).toFixed(0)
                  : 0}
                %
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-slate-100">
            ⚔️ Resumen de Enfrentamientos
          </h3>
          <button
            onClick={() => setShowDetailedRounds(!showDetailedRounds)}
            className="bg-slate-700 text-slate-300 px-4 py-2 rounded-lg hover:bg-slate-600 transition-colors"
          >
            {showDetailedRounds ? "Ocultar" : "Ver"} Detalles
          </button>
        </div>{" "}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-6">
          {rounds.map((round) => (
            <div
              key={round.round}
              className={`text-center p-4 rounded-lg border-2 ${
                round.isDraw
                  ? "bg-yellow-600/20 border-yellow-500"
                  : round.winner?.id === round.pokemon1?.id
                  ? "bg-blue-600/20 border-blue-500"
                  : "bg-red-600/20 border-red-500"
              }`}
            >
              <div className="text-sm font-semibold text-slate-300 mb-2">
                Ronda {round.round}
              </div>

              <div className="flex justify-center gap-2 mb-2">
                <img
                  src={round.pokemon1.image}
                  alt={round.pokemon1.name}
                  className={`w-8 h-8 object-contain ${
                    round.isDraw || round.winner?.id === round.pokemon1.id
                      ? ""
                      : "opacity-50"
                  }`}
                />
                <img
                  src={round.pokemon2.image}
                  alt={round.pokemon2.name}
                  className={`w-8 h-8 object-contain ${
                    round.isDraw || round.winner?.id === round.pokemon2.id
                      ? ""
                      : "opacity-50"
                  }`}
                />
              </div>
              <div className="text-xs text-slate-400">
                {round.isDraw ? "Empate" : `${round.winner?.name} gana`}
              </div>
            </div>
          ))}
        </div>
        {showDetailedRounds && (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-slate-200">
              Detalles de Batalla:
            </h4>
            {rounds.map((round) => (
              <div key={round.round} className="bg-slate-700/30 rounded-lg p-4">
                <h5 className="font-semibold text-slate-200 mb-3">
                  🥊 Ronda {round.round}
                </h5>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <img
                      src={round.pokemon1.image}
                      alt={round.pokemon1.name}
                      className="w-16 h-16 object-contain mx-auto mb-2"
                    />
                    <div className="text-sm font-medium text-slate-100 capitalize">
                      {round.pokemon1.name}
                    </div>
                    <div className="flex gap-1 justify-center mt-1">
                      {round.pokemon1.types?.map((type, index) => (
                        <PokemonTypeBadge
                          key={index}
                          type={type}
                          size="small"
                        />
                      ))}
                    </div>
                    <div className="text-xs text-slate-400 mt-2">
                      A: {round.pokemon1.attack} | D: {round.pokemon1.defense} |
                      S: {round.pokemon1.speed}
                    </div>
                  </div>

                  <div className="text-center">
                    <img
                      src={round.pokemon2.image}
                      alt={round.pokemon2.name}
                      className="w-16 h-16 object-contain mx-auto mb-2"
                    />
                    <div className="text-sm font-medium text-slate-100 capitalize">
                      {round.pokemon2.name}
                    </div>
                    <div className="flex gap-1 justify-center mt-1">
                      {round.pokemon2.types?.map((type, index) => (
                        <PokemonTypeBadge
                          key={index}
                          type={type}
                          size="small"
                        />
                      ))}
                    </div>
                    <div className="text-xs text-slate-400 mt-2">
                      A: {round.pokemon2.attack} | D: {round.pokemon2.defense} |
                      S: {round.pokemon2.speed}
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/50 rounded p-3">
                  <div className="text-xs text-slate-400 space-y-1">
                    {round.battleLog.map((log, index) => (
                      <div key={index}>{log}</div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={onStartNewBattle}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <span>🔄</span>
          Nueva Batalla
        </button>
        <button
          onClick={onReset}
          className="bg-slate-600 text-white px-6 py-3 rounded-lg hover:bg-slate-700 transition-colors flex items-center gap-2"
        >
          <span>↩️</span>
          Seleccionar Equipos
        </button>
      </div>
    </div>
  );
};

export default BattleResults;
