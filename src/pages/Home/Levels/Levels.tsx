import useLevels from './useLevels';

function Levels() {
  const { data: levels, isLoading, isError, isSuccess } = useLevels();

  return (
    <>
      {isError && 'Error loading levels'}
      {isLoading && 'Loading...'}
      {isSuccess && levels.length > 0 && (
        <div className="flex flex-wrap gap-8">
          {levels.map((level) => (
            <div
              key={level.id}
              className="flex w-96 flex-col border-8 border-blue"
            >
              <img src={level.thumbnailUrl} alt={`Level ${level.id}`} />
              <p className="bg-blue p-2 text-xl text-white">{level.title}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Levels;
