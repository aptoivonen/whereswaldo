import { MouseEventHandler } from 'react';
import { ZoomPanViewer } from '@/components/common';

type LevelViewerProps = {
  levelId: string;
};

function LevelViewer({ levelId }: LevelViewerProps) {
  const handleImageClick: MouseEventHandler<HTMLImageElement> = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const [imageX, imageY, imageWidth, imageHeight] = [
      Math.floor(e.clientX - rect.left),
      Math.floor(e.clientY - rect.top),
      rect.width,
      rect.height,
    ];
    const [imagePercentageX, imagePercentageY] = [
      Math.floor((100 * imageX) / imageWidth),
      Math.floor((100 * imageY) / imageHeight),
    ];
    console.log({ imagePercentageX, imagePercentageY });
  };

  return (
    <div className="h-full w-full overflow-hidden">
      <ZoomPanViewer
        onImageClick={handleImageClick}
        imgSrc="https://placehold.co/2000x1000"
        imgAlt="A level"
      />
    </div>
  );
}

export default LevelViewer;
