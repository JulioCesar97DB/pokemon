import { useState } from "react";
import { usePokemonList } from "./usePokemon";

export const usePokemonPagination = (pokemonPerPage = 20) => {
  const [currentPage, setCurrentPage] = useState(0);

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

  return {
    data,
    isLoading,
    isError,
    isFetching,
    currentPage,
    handleNextPage,
    handlePrevPage
  };
};
