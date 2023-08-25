import { MouseEventHandler, useState } from 'react';

type TargetingCircleProps = {
  zoom: number;
  radiusPercentage: number;
  imageDimensions: {
    imageX: number;
    imageY: number;
    imageWidth: number;
    imageHeight: number;
  } | null;
  onMouseMove: MouseEventHandler<HTMLDivElement>;
  children: React.ReactNode;
};

function TargetingCircle({
  zoom,
  radiusPercentage,
  imageDimensions,
  onMouseMove,
  children,
}: TargetingCircleProps) {
  const [isShow, setIsShow] = useState(false);

  const isRender = !!imageDimensions && isShow;

  const radiusPixels = imageDimensions
    ? Math.floor(((zoom * radiusPercentage) / 100) * imageDimensions.imageWidth)
    : 0;

  const handleMouseLeave: MouseEventHandler<HTMLDivElement> = () => {
    setIsShow(false);
  };

  const handleMouseEnter: MouseEventHandler<HTMLDivElement> = () => {
    setIsShow(true);
  };

  return (
    <div
      id="targetingCircle"
      className="relative"
      onMouseMove={onMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      {isRender && (
        <div
          className="pointer-events-none absolute z-10 rounded-full border-4 border-dashed border-black"
          style={{
            width: `${radiusPixels}px`,
            height: `${radiusPixels}px`,
            transform: `translate(calc(-50% + ${imageDimensions.imageX}px), calc(-50% + ${imageDimensions.imageY}px))`,
          }}
        />
      )}
      {children}
    </div>
  );
}

export default TargetingCircle;
