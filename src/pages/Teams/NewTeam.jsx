import { useTeamEditor } from "../../hooks/useTeamEditor";
import { useAutoSave } from "../../hooks/useAutoSave"; 
import { usePokemonPagination } from "../../hooks/usePokemonPagination";
import TeamBuilder from "../../components/teams/TeamBuilder";
import PokemonTeamList from "../../components/teams/PokemonTeamList";
import PageHeader from "../../components/teams/PageHeader";

export const NewTeam = () => {
  const {
    selectedPokemon,
    teamName,
    setTeamName,
    showTeamBuilder,
    setShowTeamBuilder,
    editMode,
    isEditingTeam,
    hasBeenSaved,
    setHasBeenSaved,
    addPokemonToTeam,
    removePokemonFromTeam,
    saveAsTeam,
    saveAsDraft,
    createDraft
  } = useTeamEditor();

  const {
    data,
    isLoading,
    isError,
    isFetching,
    currentPage,
    handleNextPage,
    handlePrevPage
  } = usePokemonPagination(20);

  useAutoSave({
    editMode,
    teamName,
    selectedPokemon,
    hasBeenSaved,
    setHasBeenSaved,
    createDraft
  });

  return (
    <div className="p-6">
      <PageHeader 
        editMode={editMode}
        isEditingTeam={isEditingTeam}
        teamName={teamName}
      />

      <TeamBuilder
        selectedPokemon={selectedPokemon}
        teamName={teamName}
        setTeamName={setTeamName}
        showTeamBuilder={showTeamBuilder}
        setShowTeamBuilder={setShowTeamBuilder}
        removePokemonFromTeam={removePokemonFromTeam}
        saveAsTeam={saveAsTeam}
        saveAsDraft={saveAsDraft}
        editMode={editMode}
        isEditingTeam={isEditingTeam}
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
