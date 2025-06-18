import { useTeamsStore } from '../../store/teamsStore';
import TeamsGrid from '../../components/teams/TeamsGrid';

export const TeamsPage = () => {
  const { teams, deleteTeam } = useTeamsStore();

  return (
    <TeamsGrid
      teams={teams}
      onDelete={deleteTeam}
    />
  );
};
