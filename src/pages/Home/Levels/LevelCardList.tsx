import { Alert, Grid } from '@/components/common';
import LevelCard from './LevelCard';
import useLevels from './useLevels';
import LevelCardSkeleton from './LevelCardSkeleton';

function LevelCardList() {
  const levels = useLevels();

  if (!levels.data) {
    return (
      <Grid min="300px" className="gap-8">
        {[1, 2, 3].map((i) => (
          <LevelCardSkeleton key={i} />
        ))}
      </Grid>
    );
  }

  return (
    <div>
      {!!levels.error && (
        <Alert variant="warning">{levels.error.message}</Alert>
      )}
      {levels.data.length > 0 ? (
        <Grid min="300px" className="gap-8">
          {levels.data.map((level) => (
            <LevelCard key={level.id} level={level} />
          ))}
        </Grid>
      ) : (
        <span className="italic">No levels found.</span>
      )}
    </div>
  );
}

export default LevelCardList;
