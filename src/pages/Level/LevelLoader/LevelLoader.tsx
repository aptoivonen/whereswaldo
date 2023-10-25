import { FallbackRender, withErrorBoundary } from '@/components/common';
import LevelViewer from '../LevelViewer/LevelViewer';
import useLevel from './useLevel';

type LevelLoaderProps = {
  levelId: string;
};

function LevelLoader({ levelId }: LevelLoaderProps) {
  const level = useLevel(levelId);

  if (!level.data) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-xl">Loading Level...</p>
      </div>
    );
  }

  return <LevelViewer level={level.data} />;
}

export default withErrorBoundary(LevelLoader, {
  fallbackRender: FallbackRender,
});
