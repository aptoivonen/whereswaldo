import { MouseEventHandler } from 'react';
import { ZoomPanViewer } from '@/components/common';
import getImageClickPosition from './getImageClickPosition';
import useLevel from './useLevel';

type LevelViewerProps = {
  levelId: string;
};

function LevelViewer({ levelId }: LevelViewerProps) {
  const level = useLevel(levelId);

  const handleImageClick: MouseEventHandler<HTMLImageElement> = (e) => {
    const [imagePercentageX, imagePercentageY] = getImageClickPosition(e);
    console.log({ imagePercentageX, imagePercentageY });
  };

  if (!level.data) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-xl">Loading Level...</p>
      </div>
    );
  }

  return (
    <>
      <h1 className="absolute top-4 left-4 z-20 bg-blue px-2 py-1 text-white">
        Level: {level.data.title}
      </h1>
      <div className="h-full w-full overflow-hidden">
        <ZoomPanViewer
          onImageClick={handleImageClick}
          imgSrc={level.data.imgUrl}
          imgAlt={level.data.title}
        />
      </div>
    </>
  );
}

export default LevelViewer;
