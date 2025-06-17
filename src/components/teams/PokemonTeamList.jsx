import React from "react";
import PokemonCard from "../Home/PokemonCard";
import Pagination from "../commons/Pagination";
import { LoadingSpinner } from "../ui/LoadingSpinner";
import { ErrorAlert } from "../ui/ErrorAlert";

const PokemonTeamList = ({
  data,
  isLoading,
  isError,
  isFetching,
  selectedPokemon,
  addPokemonToTeam,
  currentPage,
  handleNextPage,
  handlePrevPage,
}) => {
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <ErrorAlert />;
  }

  return (
    <>
      {isFetching && <LoadingSpinner />}

      {data && data.pokemon && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
            {data.pokemon.map((pokemon) => (
              <div key={pokemon.id} className="relative">
                <PokemonCard pokemon={pokemon} />
                <button
                  onClick={() => addPokemonToTeam(pokemon)}
                  disabled={selectedPokemon.some((p) => p.id === pokemon.id)}
                  className={`absolute top-2 right-2 px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    selectedPokemon.some((p) => p.id === pokemon.id)
                      ? "bg-green-600 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {selectedPokemon.some((p) => p.id === pokemon.id)
                    ? "✓"
                    : "Agregar"}
                </button>
              </div>
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            onNextPage={handleNextPage}
            onPrevPage={handlePrevPage}
            hasNext={data.next}
            isLoading={isFetching}
          />
        </>
      )}
    </>
  );
};

export default PokemonTeamList;
