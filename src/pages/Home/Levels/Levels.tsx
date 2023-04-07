import Grid from '@/components/common/Grid';
import LevelCard from './LevelCard';
import useLevels from './useLevels';

function Levels() {
  const { data: levels, isLoading, isError, isSuccess } = useLevels();

  return (
    <>
      {isError && 'Error loading levels'}
      {isLoading && 'Loading...'}
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
