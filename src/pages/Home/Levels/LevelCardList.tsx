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
      <div className={gridClassname}>
        {[1, 2].map((i) => (
          <LevelCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return levels.data.length > 0 ? (
    <div className={gridClassname}>
      {levels.data.map((level) => (
        <LevelCard key={level.id} level={level} />
      ))}
    </div>
  ) : (
    <span className="italic">No levels found.</span>
  );
}

export default withErrorBoundary(LevelCardList, {
  fallbackRender: FallbackRender,
});
