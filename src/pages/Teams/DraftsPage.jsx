import { useTeamsStore } from '../../store/teamsStore';
import DraftsGrid from '../../components/teams/DraftsGrid';

export const DraftsPage = () => {
  const { drafts, deleteDraft, promoteDraftToTeam } = useTeamsStore();

  return (
    <DraftsGrid
      drafts={drafts}
      onDelete={deleteDraft}
      onPromote={promoteDraftToTeam}
    />
  );
};
