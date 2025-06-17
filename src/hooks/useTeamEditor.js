import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTeamsStore } from "../store/teamsStore";

export const useTeamEditor = () => {
  const [selectedPokemon, setSelectedPokemon] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [showTeamBuilder, setShowTeamBuilder] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editItemId, setEditItemId] = useState(null);
  const [isEditingTeam, setIsEditingTeam] = useState(false);
  const [hasBeenSaved, setHasBeenSaved] = useState(false);

  const { createTeam, createDraft, updateDraft } = useTeamsStore();  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.editMode && location.state?.itemData) {
      const { itemData, isTeam } = location.state;
      setEditMode(true);
      setEditItemId(itemData.id);
      setIsEditingTeam(isTeam);
      setTeamName(itemData.name);
      setSelectedPokemon(itemData.pokemon || []);
      setShowTeamBuilder(true);
    }
  }, [location.state]);

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

    setHasBeenSaved(true);

    if (editMode && !isEditingTeam) {
      updateDraft(editItemId, teamName.trim(), selectedPokemon);
      alert("¡Borrador actualizado exitosamente!");
      navigate("/teams/drafts");
    } else {
      createTeam(teamName.trim(), selectedPokemon);
      alert("¡Equipo creado exitosamente!");
      navigate("/teams");
    }
  };

  const saveAsDraft = () => {
    if (!teamName.trim()) {
      alert("Por favor ingresa un nombre para el borrador");
      return;
    }

    setHasBeenSaved(true);

    if (editMode && !isEditingTeam) {
      updateDraft(editItemId, teamName.trim(), selectedPokemon);
      alert("¡Borrador actualizado exitosamente!");
      navigate("/teams/drafts");
    } else {
      createDraft(teamName.trim(), selectedPokemon);
      alert("¡Borrador guardado exitosamente!");
      navigate("/teams/drafts");
    }
  };
  return {
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
  };
};
