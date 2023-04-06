import LevelCard from './LevelCard';
import useLevels from './useLevels';

function Levels() {
  const { data: levels, isLoading, isError, isSuccess } = useLevels();

  return (
    <>
      {isError && 'Error loading levels'}
      {isLoading && 'Loading...'}
      {isSuccess && levels.length > 0 && (
        <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-8">
          {levels.map((level) => (
            <LevelCard key={level.id} level={level} />
          ))}
        </div>
      )}
    </>
  );
}

export default Levels;
