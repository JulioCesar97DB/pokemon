import React, { useState } from "react";
import { usePokemonList } from "../../hooks/usePokemon";
import { useTeamsStore } from "../../store/teamsStore";
import { useNavigate } from "react-router-dom";
import { ErrorAlert } from "../../components/ui/ErrorAlert";
import TeamBuilder from "../../components/teams/TeamBuilder";
import PokemonTeamList from "../../components/teams/PokemonTeamList";

export const NewTeam = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [pokemonPerPage] = useState(20);
  const [selectedPokemon, setSelectedPokemon] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [showTeamBuilder, setShowTeamBuilder] = useState(false);

  const { createTeam, createDraft } = useTeamsStore();
  const navigate = useNavigate();

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

  const addPokemonToTeam = (pokemon) => {
    if (selectedPokemon.length >= 6) {
      alert("Un equipo no puede tener más de 6 Pokémon");
      return;
    }

    if (selectedPokemon.some((p) => p.id === pokemon.id)) {
      alert("Este Pokémon ya está en tu equipo");
      return;
    }

    setSelectedPokemon([...selectedPokemon, pokemon]);
  };

  const removePokemonFromTeam = (pokemonId) => {
    setSelectedPokemon(selectedPokemon.filter((p) => p.id !== pokemonId));
  };

  const saveAsTeam = () => {
    if (!teamName.trim()) {
      alert("Por favor ingresa un nombre para el equipo");
      return;
    }

    createTeam(teamName.trim(), selectedPokemon);
    alert("¡Equipo creado exitosamente!");
    navigate("/teams");
  };

  const saveAsDraft = () => {
    if (!teamName.trim()) {
      alert("Por favor ingresa un nombre para el borrador");
      return;
    }

    createDraft(teamName.trim(), selectedPokemon);
    alert("¡Borrador guardado exitosamente!");
    navigate("/teams/drafts");
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-100 mb-2">
          Crear Nuevo Equipo
        </h1>
        <p className="text-slate-400">
          Selecciona hasta 6 Pokémon para formar tu equipo
        </p>
      </div>

      <TeamBuilder
        selectedPokemon={selectedPokemon}
        teamName={teamName}
        setTeamName={setTeamName}
        showTeamBuilder={showTeamBuilder}
        setShowTeamBuilder={setShowTeamBuilder}
        removePokemonFromTeam={removePokemonFromTeam}
        saveAsTeam={saveAsTeam}
        saveAsDraft={saveAsDraft}
      />

      <PokemonTeamList
        data={data}
        isLoading={isLoading}
        isError={isError}
        isFetching={isFetching}
        selectedPokemon={selectedPokemon}
        addPokemonToTeam={addPokemonToTeam}
        currentPage={currentPage}
        handleNextPage={handleNextPage}
        handlePrevPage={handlePrevPage}
      />
    </div>
  );
};
