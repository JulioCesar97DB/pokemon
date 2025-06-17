import { useTeamsStore } from '../../store/teamsStore';
import TeamGrid from '../../components/teams/TeamGrid';

export const TeamsPage = () => {
  const { teams, deleteTeam } = useTeamsStore();

  return (
    <TeamGrid
      items={teams}
      title="Mis Equipos"
      emptyMessage="No tienes equipos creados"
      onDelete={deleteTeam}
      showWinLoss={true}
    />
  );
};
