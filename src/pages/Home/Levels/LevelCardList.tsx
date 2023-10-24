import { FallbackRender, withErrorBoundary } from '@/components/common';
import LevelCard from './LevelCard';
import useLevels from './useLevels';
import LevelCardSkeleton from './LevelCardSkeleton';

function LevelCardList() {
  const levels = useLevels();

  const gridClassname =
    'grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-8';

  if (!levels.data) {
    return (
      <ul className={gridClassname}>
        {[1, 2].map((i) => (
          <li key={i}>
            <LevelCardSkeleton />
          </li>
        ))}
      </ul>
    );
  }

  return levels.data.length > 0 ? (
    <ul className={gridClassname}>
      {levels.data.map((level) => (
        <li
          key={level.id}
          className="transition-transform duration-100 ease-in-out hover:scale-105 focus:scale-105"
        >
          <LevelCard level={level} />
        </li>
      ))}
    </ul>
  ) : (
    <span className="italic">No levels found.</span>
  );
}

export default withErrorBoundary(LevelCardList, {
  fallbackRender: FallbackRender,
});
