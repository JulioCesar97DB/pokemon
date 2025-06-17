import React from "react";
import PokemonTypeBadge from "../commons/PokemonTypeBadge";

const PokemonCard = ({ pokemon }) => {
  const formatNumber = (number) => {
    return `#${number.toString().padStart(3, "0")}`;
  };
  return (
    <div className="bg-slate-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-slate-700">
      <div className="bg-slate-700 px-4 py-2">
        <span className="text-sm font-semibold text-slate-300">
          {formatNumber(pokemon.number)}
        </span>
      </div>

      <div className="flex justify-center items-center p-6 bg-gradient-to-br from-slate-700 to-slate-600">
        {pokemon.image ? (
          <img
            src={pokemon.image}
            alt={pokemon.name}
            className="w-24 h-24 object-contain"
            loading="lazy"
          />
        ) : (
          <div className="w-24 h-24 bg-slate-600 rounded-full flex items-center justify-center">
            <span className="text-slate-400 text-xs">No Image</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="capitalize text-lg font-bold text-slate-100 mb-2 text-center">
          {pokemon.name}
        </h3>
        <div className="flex justify-center gap-2 mb-4">
          {pokemon.types.map((type, index) => (
            <PokemonTypeBadge key={index} type={type} />
          ))}
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-slate-300">Ataque:</span>
            <div className="flex items-center gap-2">
              <div className="w-16 bg-slate-600 rounded-full h-2">
                <div
                  className="bg-red-500 h-2 rounded-full"
                  style={{
                    width: `${Math.min((pokemon.attack / 150) * 100, 100)}%`,
                  }}
                ></div>
              </div>
              <span className="text-sm font-semibold text-slate-100">
                {pokemon.attack}
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-slate-300">Defensa:</span>
            <div className="flex items-center gap-2">
              <div className="w-16 bg-slate-600 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{
                    width: `${Math.min((pokemon.defense / 150) * 100, 100)}%`,
                  }}
                ></div>
              </div>
              <span className="text-sm font-semibold text-slate-100">
                {pokemon.defense}
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-slate-300">
              Velocidad:
            </span>
            <div className="flex items-center gap-2">
              <div className="w-16 bg-slate-600 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{
                    width: `${Math.min((pokemon.speed / 150) * 100, 100)}%`,
                  }}
                ></div>
              </div>
              <span className="text-sm font-semibold text-slate-100">
                {pokemon.speed}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
