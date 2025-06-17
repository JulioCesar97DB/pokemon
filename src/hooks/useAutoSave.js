import { useEffect, useCallback, useRef } from "react";

export const useAutoSave = ({ 
  editMode, 
  teamName, 
  selectedPokemon, 
  hasBeenSaved, 
  setHasBeenSaved, 
  createDraft 
}) => {
  const hasAutoSaved = useRef(false);
  const valuesRef = useRef();
  
  valuesRef.current = {
    editMode,
    teamName,
    selectedPokemon,
    hasBeenSaved,
    setHasBeenSaved,
    createDraft
  };

  const autoSaveAsDraft = useCallback(() => {
    const { editMode, teamName, selectedPokemon, hasBeenSaved, setHasBeenSaved, createDraft } = valuesRef.current;
    
    console.log('autoSaveAsDraft called:', { 
      editMode, 
      teamName: teamName.trim(), 
      pokemonCount: selectedPokemon.length, 
      hasBeenSaved, 
      hasAutoSaved: hasAutoSaved.current 
    });
    
    if (!editMode && teamName.trim() && selectedPokemon.length > 0 && !hasBeenSaved && !hasAutoSaved.current) {
      try {
        createDraft(`${teamName.trim()} (Auto-guardado)`, selectedPokemon);
        setHasBeenSaved(true);
        hasAutoSaved.current = true;
        console.log('Equipo auto-guardado como borrador');
      } catch (error) {
        console.error('Error al auto-guardar:', error);
      }
    }
  }, []);  useEffect(() => {
    const handleBeforeUnload = (event) => {
      const { editMode, teamName, selectedPokemon, hasBeenSaved } = valuesRef.current;
      if (!editMode && teamName.trim() && selectedPokemon.length > 0 && !hasBeenSaved && !hasAutoSaved.current) {
        autoSaveAsDraft();
        event.preventDefault();
        event.returnValue = 'Tu progreso se guardará como borrador. ¿Estás seguro de que quieres salir?';
        return event.returnValue;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [autoSaveAsDraft]);

  useEffect(() => {
    return () => {
      autoSaveAsDraft();
    };
  }, [autoSaveAsDraft]);

  return { autoSaveAsDraft };
};
