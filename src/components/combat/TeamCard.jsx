export const TeamCard = ({
  team,
  onSelect,
  isSelected,
  isDisabled,
  selectedColor,
}) => {
  const getWinRate = (wins, losses) => {
    const total = wins + losses;
    return total > 0 ? `${((wins / total) * 100).toFixed(0)}%` : "0%";
  };

  return (
    <div
      key={team.id}
      onClick={() => onSelect(team)}
      className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
        isSelected
          ? `${selectedColor} border-2`
          : isDisabled
          ? "bg-slate-700/50 border border-slate-600 opacity-50 cursor-not-allowed"
          : "bg-slate-700/50 border border-slate-600 hover:bg-slate-700 hover:border-slate-500"
      }`}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-bold text-slate-100">{team.name}</h3>
        <span className="text-sm text-slate-400">{team.pokemon.length}/6</span>
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
        <span>{getWinRate(team.wins, team.losses)}</span>
      </div>
    </div>
  );
};
