import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useTeamsStore = create(
  persist(
    (set, get) => ({
      teams: [],
      drafts: [],

      createTeam: (name, pokemon = []) => {
        const newTeam = {
          id: Date.now().toString(),
          name,
          pokemon,
          wins: 0,
          losses: 0
        };

        set((state) => ({
          teams: [...state.teams, newTeam]
        }));

        return newTeam;
      },

      createDraft: (name, pokemon = []) => {
        const newDraft = {
          id: Date.now().toString(),
          name,
          pokemon
        };

        set((state) => ({
          drafts: [...state.drafts, newDraft]
        }));

        return newDraft;
      },

      addPokemon: (id, pokemon, isTeam = true) => {
        const collection = isTeam ? get().teams : get().drafts;
        const item = collection.find(item => item.id === id);
        
        if (!item) return false;

        if (item.pokemon.length >= 6) {
          throw new Error(`Un ${isTeam ? 'equipo' : 'borrador'} no puede tener más de 6 Pokémon`);
        }

        if (item.pokemon.some(p => p.id === pokemon.id)) {
          throw new Error('Este Pokémon ya está en el equipo/borrador');
        }

        const stateKey = isTeam ? 'teams' : 'drafts';
        
        set((state) => ({
          [stateKey]: state[stateKey].map((item) =>
            item.id === id
              ? { ...item, pokemon: [...item.pokemon, pokemon] }
              : item
          )
        }));

        return true;
      },      removePokemon: (id, pokemonId, isTeam = true) => {
        const stateKey = isTeam ? 'teams' : 'drafts';
        
        set((state) => ({
          [stateKey]: state[stateKey].map((item) =>
            item.id === id
              ? { ...item, pokemon: item.pokemon.filter(p => p.id !== pokemonId) }
              : item
          )
        }));
      },

      updateTeamRecord: (teamId, result) => {
        const team = get().teams.find(t => t.id === teamId);
        if (!team) return false;

        if (result !== 'win' && result !== 'lose') {
          throw new Error('El resultado debe ser "win" o "lose"');
        }

        set((state) => ({
          teams: state.teams.map((team) =>
            team.id === teamId
              ? {
                  ...team,
                  wins: result === 'win' ? team.wins + 1 : team.wins,
                  losses: result === 'lose' ? team.losses + 1 : team.losses
                }
              : team
          )
        }));        return true;
      },

      updateTeam: (teamId, name, pokemon = []) => {
        const team = get().teams.find(t => t.id === teamId);
        if (!team) return false;

        set((state) => ({
          teams: state.teams.map((team) =>
            team.id === teamId
              ? { ...team, name, pokemon }
              : team
          )
        }));        return true;
      },

      updateDraft: (draftId, name, pokemon = []) => {
        const draft = get().drafts.find(d => d.id === draftId);
        if (!draft) return false;

        set((state) => ({
          drafts: state.drafts.map((draft) =>
            draft.id === draftId
              ? { ...draft, name, pokemon }
              : draft
          )
        }));        return true;
      },

      deleteTeam: (teamId) => {
        set((state) => ({
          teams: state.teams.filter(team => team.id !== teamId)        }));
      },

      deleteDraft: (draftId) => {
        set((state) => ({
          drafts: state.drafts.filter(draft => draft.id !== draftId)        }));
      },

      promoteDraftToTeam: (draftId) => {
        const draft = get().drafts.find(d => d.id === draftId);
        if (!draft) return false;

        const newTeam = {
          id: Date.now().toString(),
          name: draft.name,
          pokemon: draft.pokemon,
          wins: 0,
          losses: 0
        };

        set((state) => ({
          teams: [...state.teams, newTeam],
          drafts: state.drafts.filter(d => d.id !== draftId)
        }));        return newTeam;
      },

      getDraftById: (draftId) => {
        return get().drafts.find(draft => draft.id === draftId);
      }
    }),
    {
      name: 'pokemon-teams-storage',
      version: 1
    }
  )
);
