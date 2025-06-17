const typeColors = {
  normal: "bg-gray-400",
  fire: "bg-red-500",
  water: "bg-blue-500",
  electric: "bg-yellow-400",
  grass: "bg-green-500",
  ice: "bg-blue-200",
  fighting: "bg-red-700",
  poison: "bg-purple-500",
  ground: "bg-yellow-600",
  flying: "bg-indigo-400",
  psychic: "bg-pink-500",
  bug: "bg-green-400",
  rock: "bg-yellow-800",
  ghost: "bg-purple-700",
  dragon: "bg-indigo-700",
  dark: "bg-gray-800",
  steel: "bg-gray-500",
  fairy: "bg-pink-300",
};

const PokemonCard = ({ pokemon }) => {
  const formatName = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

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
        <h3 className="text-lg font-bold text-slate-100 mb-2 text-center">
          {formatName(pokemon.name)}
        </h3>

        <div className="flex justify-center gap-2 mb-4">
          {pokemon.types.map((type, index) => (
            <span
              key={index}
              className={`px-3 py-1 rounded-full text-white text-xs font-medium ${
                typeColors[type] || "bg-gray-500"
              }`}
            >
              {formatName(type)}
            </span>
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
