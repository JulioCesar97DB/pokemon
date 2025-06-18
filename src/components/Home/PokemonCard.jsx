import PokemonTypeBadge from "../commons/PokemonTypeBadge";
import { StatBar } from "./StatBar";

const PokemonCard = ({ pokemon }) => {
  const formatNumber = (number) => `#${number.toString().padStart(3, "0")}`;

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
        </div>{" "}
        <div className="space-y-2">
          <StatBar label="Ataque" value={pokemon.attack} color="bg-red-500" />
          <StatBar
            label="Defensa"
            value={pokemon.defense}
            color="bg-blue-500"
          />
          <StatBar
            label="Velocidad"
            value={pokemon.speed}
            color="bg-green-500"
          />
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
