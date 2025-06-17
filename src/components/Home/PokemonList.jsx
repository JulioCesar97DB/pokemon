import { useState } from "react";
import { usePokemonList } from "../../hooks/usePokemon";
import PokemonCard from "./PokemonCard";

const PokemonList = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [pokemonPerPage] = useState(20);

  const { data, isLoading, isError, error, isFetching } = usePokemonList(
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-slate-300">Cargando...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-96">
          <div className="text-center">
            <div className="text-red-400 text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-slate-100 mb-2">
              Error al cargar
            </h2>
            <p className="text-slate-300 mb-4">
              {error?.message || "Hubo un problema al cargar los Pokémon"}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Intentar de nuevo
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2 text-slate-100">Pokédex</h1>
        <p className="text-slate-300">Descubre el mundo de los Pokémon</p>
        {data && (
          <p className="text-sm text-slate-400 mt-2">
            Mostrando {data.pokemon.length} de {data.total} Pokémon
          </p>
        )}
      </div>      {isFetching && (
        <div className="flex justify-center mb-4">
          <div className="bg-blue-900 text-blue-200 px-4 py-2 rounded-lg flex items-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-300"></div>
            Actualizando...
          </div>
        </div>
      )}

      {data && data.pokemon && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
            {data.pokemon.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
          </div>          <div className="flex justify-center items-center gap-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 0 || isFetching}
              className="bg-slate-600 text-white px-6 py-2 rounded-lg hover:bg-slate-500 disabled:bg-slate-700 disabled:cursor-not-allowed transition-colors"
            >
              Anterior
            </button>

            <span className="text-slate-300">Página {currentPage + 1}</span>

            <button
              onClick={handleNextPage}
              disabled={!data.next || isFetching}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-500 disabled:bg-slate-700 disabled:cursor-not-allowed transition-colors"
            >
              Siguiente
            </button>
          </div>
        </>
      )}      {data && data.pokemon && data.pokemon.length === 0 && (
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
