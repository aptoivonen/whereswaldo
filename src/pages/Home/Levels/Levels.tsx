import { Skeleton } from '@/components/common';
import Grid from '@/components/common/Grid';
import LevelCard from './LevelCard';
import useLevels from './useLevels';

function Levels() {
  const { data: levels, isLoading, isError, isSuccess } = useLevels();

  return (
    <>
      {isError && 'Error loading levels'}
      {isLoading && (
        <Grid min="300px" className="gap-8">
          {Array(3)
            .fill(0)
            .map((_, i) => i)
            .map((i) => (
              <div key={i}>
                <div className="aspect-h-1 aspect-w-2">
                  <Skeleton count={1} height="calc(100% + 2.75rem + 2 * 8px)" />
                </div>
              </div>
            ))}
        </Grid>
      )}
      {isSuccess && levels.length > 0 ? (
        <Grid min="300px" className="gap-8">
          {levels.map((level) => (
            <LevelCard key={level.id} level={level} />
          ))}
        </Grid>
      ) : (
        <span className="italic">No levels found.</span>
      )}
    </>
  );
}

export default Levels;
