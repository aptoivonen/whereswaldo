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
            <div key={level.id} className="flex flex-col border-8 border-blue">
              <div className="relative pb-[50%]">
                <img
                  className="absolute block h-full w-full object-cover"
                  src={level.thumbnailUrl}
                  alt={`Level ${level.id}`}
                />
              </div>
              <p className="bg-blue p-2 text-xl text-white">{level.title}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Levels;
