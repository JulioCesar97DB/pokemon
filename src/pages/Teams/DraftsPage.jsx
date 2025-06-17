import { useTeamsStore } from '../../store/teamsStore';
import TeamGrid from '../../components/teams/TeamGrid';

export const DraftsPage = () => {
  const { drafts, deleteDraft, promoteDraftToTeam } = useTeamsStore();

  return (
    <TeamGrid
      items={drafts}
      title="Mis Borradores"
      emptyMessage="No tienes borradores guardados"
      onDelete={deleteDraft}
      onPromote={promoteDraftToTeam}
      showWinLoss={false}
    />
  );
};
