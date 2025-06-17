import { useState } from "react";
import { usePokemonList } from "../../hooks/usePokemon";
import PokemonCard from "./PokemonCard";
import { LoadingSpinner } from "../ui/LoadingSpinner";
import { ErrorAlert } from "../ui/ErrorAlert";
import Pagination from "../commons/Pagination";

const PokemonList = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [pokemonPerPage] = useState(20);

  const { data, isLoading, isError, isFetching } = usePokemonList(
    pokemonPerPage,
    currentPage * pokemonPerPage
  );

  const handleNextPage = () => {
    if (data && data.next) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  if (isLoading) return <LoadingSpinner />;

  if (isError) return <ErrorAlert />;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2 text-slate-100">Pokédex</h1>
        <p className="text-slate-300">Descubre el mundo de los Pokémon</p>
        {data && (
          <p className="text-sm text-slate-400 mt-2">
            Mostrando {data.pokemon.length} de {data.total} Pokémon
          </p>
        )}
      </div>

      {isFetching && <LoadingSpinner />}

      {data && data.pokemon && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
            {data.pokemon.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}          </div>
          <Pagination
            currentPage={currentPage}
            onNextPage={handleNextPage}
            onPrevPage={handlePrevPage}
            hasNext={data.next}
            isLoading={isFetching}
          />
        </>
      )}
      {data && data.pokemon && data.pokemon.length === 0 && (
        <div className="text-center py-12">
          <div className="text-slate-400 text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-slate-200 mb-2">
            No se encontraron Pokémon
          </h3>
          <p className="text-slate-400">
            Intenta ajustar los filtros de búsqueda
          </p>
        </div>
      )}
    </div>
  );
};

export default PokemonList;
