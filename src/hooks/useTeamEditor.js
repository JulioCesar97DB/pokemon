import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTeamsStore } from "../store/teamsStore";
import { useCustomAlerts } from "../components/ui/CustomAlert";

export const useTeamEditor = () => {
  const [selectedPokemon, setSelectedPokemon] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [showTeamBuilder, setShowTeamBuilder] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editItemId, setEditItemId] = useState(null);
  const [isEditingTeam, setIsEditingTeam] = useState(false);
  const [hasBeenSaved, setHasBeenSaved] = useState(false);

  const { createTeam, createDraft, updateDraft } = useTeamsStore();
  const { showSuccess, showError, showWarning } = useCustomAlerts();
  const navigate = useNavigate();
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
      showWarning("Un equipo no puede tener más de 6 Pokémon", {
        description: "Remueve un Pokémon para agregar otro"
      });
      return;
    }

    if (selectedPokemon.some((p) => p.id === pokemon.id)) {
      showWarning("Este Pokémon ya está en tu equipo", {
        description: "Cada Pokémon solo puede estar una vez en el equipo"
      });
      return;
    }

    setSelectedPokemon([...selectedPokemon, pokemon]);
    showSuccess(`${pokemon.name} agregado al equipo`, {
      description: `${selectedPokemon.length + 1}/6 Pokémon en el equipo`
    });
  };

  const removePokemonFromTeam = (pokemonId) => {
    setSelectedPokemon(selectedPokemon.filter((p) => p.id !== pokemonId));
  };
  const saveAsTeam = () => {
    if (!teamName.trim()) {
      showError("Por favor ingresa un nombre para el equipo", {
        description: "El nombre del equipo es obligatorio"
      });
      return;
    }

    try {
      setHasBeenSaved(true);

      if (editMode && !isEditingTeam) {
        updateDraft(editItemId, teamName.trim(), selectedPokemon);
        showSuccess("¡Borrador actualizado exitosamente!", {
          description: `"${teamName}" ha sido actualizado`
        });
        navigate("/teams/drafts");
      } else {
        createTeam(teamName.trim(), selectedPokemon);
        showSuccess("¡Equipo creado exitosamente!", {
          description: `"${teamName}" está listo para batallar`
        });
        navigate("/teams");
      }
    } catch (error) {
      console.error("Error al guardar equipo:", error);
      showError("Error al guardar el equipo", {
        description: "Inténtalo de nuevo"
      });
    }
  };
  const saveAsDraft = () => {
    if (!teamName.trim()) {
      showError("Por favor ingresa un nombre para el borrador", {
        description: "El nombre del borrador es obligatorio"
      });
      return;
    }

    try {
      setHasBeenSaved(true);

      if (editMode && !isEditingTeam) {
        updateDraft(editItemId, teamName.trim(), selectedPokemon);
        showSuccess("¡Borrador actualizado exitosamente!", {
          description: `"${teamName}" ha sido guardado`
        });
        navigate("/teams/drafts");
      } else {
        createDraft(teamName.trim(), selectedPokemon);
        showSuccess("¡Borrador guardado exitosamente!", {
          description: `"${teamName}" se guardó en tus borradores`
        });
        navigate("/teams/drafts");
      }
    } catch (error) {
      console.error("Error al guardar borrador:", error);
      showError("Error al guardar el borrador", {
        description: "Inténtalo de nuevo"
      });
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
