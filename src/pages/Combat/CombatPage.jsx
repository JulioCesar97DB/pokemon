import { useState } from "react";
import { useTeamsStore } from "../../store/teamsStore";
import { useCustomAlerts } from "../../components/ui/CustomAlert";
import TeamSelector from "../../components/combat/TeamSelector";
import BattleArena from "../../components/combat/BattleArena";
import BattleResults from "../../components/combat/BattleResults";
import {
  battleTeams,
  validateBattleTeams,
  updateBattleRecords,
  getBattleResultMessage,
} from "../../utils/battleUtils";

export const CombatPage = () => {
  const { teams, updateTeamRecord } = useTeamsStore();
  const { showError, showSuccess } = useCustomAlerts();
  const [selectedTeam1, setSelectedTeam1] = useState(null);
  const [selectedTeam2, setSelectedTeam2] = useState(null);
  const [battleResults, setBattleResults] = useState(null);
  const [battlePhase, setBattlePhase] = useState("selection");

  const startBattle = () => {
    const validation = validateBattleTeams(selectedTeam1, selectedTeam2);
    if (!validation.isValid) {
      showError(validation.error);
      return;
    }

    setBattlePhase("battle");

    const results = battleTeams(selectedTeam1, selectedTeam2);

    updateBattleRecords(results, updateTeamRecord);

    setBattleResults(results);
    setBattlePhase("results");

    const message = getBattleResultMessage(results);
    showSuccess(message);
  };
  const resetBattle = () => {
    setSelectedTeam1(null);
    setSelectedTeam2(null);
    setBattleResults(null);
    setBattlePhase("selection");
  };

  const startNewBattle = () => {
    setBattleResults(null);
    setBattlePhase("selection");
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-slate-100 mb-2 flex items-center justify-center gap-3">
          <span className="text-5xl">⚔️</span>
          Arena de Combate
        </h1>
        <p className="text-slate-400">
          Selecciona dos equipos y que comience la batalla épica
        </p>
      </div>

      {battlePhase === "selection" && (
        <TeamSelector
          teams={teams}
          selectedTeam1={selectedTeam1}
          selectedTeam2={selectedTeam2}
          onSelectTeam1={setSelectedTeam1}
          onSelectTeam2={setSelectedTeam2}
          onStartBattle={startBattle}
        />
      )}

      {battlePhase === "battle" && (
        <BattleArena team1={selectedTeam1} team2={selectedTeam2} />
      )}

      {battlePhase === "results" && battleResults && (
        <BattleResults
          results={battleResults}
          onStartNewBattle={startNewBattle}
          onReset={resetBattle}
        />
      )}
    </div>
  );
};
