import { MouseEventHandler, useState } from 'react';
import getImageClickPosition from '../LevelViewer/getImageClickPosition';

type TargetingCircleProps = {
  zoom: number;
  radiusPercentage: number;
  children: React.ReactNode;
};

function TargetingCircle({
  zoom,
  radiusPercentage,
  children,
}: TargetingCircleProps) {
  const [dimensions, setDimensions] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);

  const isShow = !!dimensions;

  const radiusPixels = dimensions
    ? Math.floor(((zoom * radiusPercentage) / 100) * dimensions.width)
    : 0;

  const handleMouseMove: MouseEventHandler<HTMLDivElement> = (e) => {
    const { imageX, imageY, imageWidth, imageHeight } = getImageClickPosition(
      e,
      zoom
    );
    setDimensions({
      x: imageX,
      y: imageY,
      width: imageWidth,
      height: imageHeight,
    });
  };

  const handleMouseLeave: MouseEventHandler<HTMLDivElement> = () => {
    setDimensions(null);
  };

  return (
    <div
      id="targetingCircle"
      className="relative"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {isShow && (
        <div
          className="pointer-events-none absolute z-10 rounded-full border-4 border-dashed border-black"
          style={{
            width: `${radiusPixels}px`,
            height: `${radiusPixels}px`,
            transform: `translate(calc(-50% + ${dimensions.x}px), calc(-50% + ${dimensions.y}px))`,
          }}
        />
      )}
      {children}
    </div>
  );
}

export default TargetingCircle;
