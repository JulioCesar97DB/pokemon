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

const PokemonTypeBadge = ({ type, size = "normal" }) => {
  const formatName = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const getSizeClasses = () => {
    switch (size) {
      case "small":
        return "px-2 py-0.5 text-xs";
      case "large":
        return "px-4 py-2 text-base";
      default:
        return "px-3 py-1 text-xs";
    }
  };

  return (
    <span
      className={`${getSizeClasses()} rounded-full text-white font-medium ${
        typeColors[type] || "bg-gray-500"
      }`}
    >
      {formatName(type)}
    </span>
  );
};

export default PokemonTypeBadge;
