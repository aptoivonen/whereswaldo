import { Skeleton } from '@/components/common';

function LevelCardSkeleton() {
  return (
    <div className="aspect-h-1 aspect-w-2">
      <Skeleton count={1} height="calc(100% + 2.75rem + 2 * 8px)" />
    </div>
  );
}

export default LevelCardSkeleton;
