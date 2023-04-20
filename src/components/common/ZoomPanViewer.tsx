/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, MouseEventHandler } from 'react';
import { PanViewer } from 'react-image-pan-zoom-rotate';

export type ZoomPanViewerProps = {
  imgSrc: string;
  imgAlt: string;
  onImageClick?: MouseEventHandler<HTMLImageElement>;
};

function ZoomPanViewer({
  imgSrc,
  imgAlt,
  onImageClick = () => {},
}: ZoomPanViewerProps) {
  const [dx, setDx] = useState(0);
  const [dy, setDy] = useState(0);
  const [zoom, setZoom] = useState(1);

  const onPan = (newDx: number, newDy: number) => {
    setDx(newDx);
    setDy(newDy);
  };

  return (
    <PanViewer
      className="z-10 flex h-full w-full items-center justify-center"
      zoom={zoom}
      setZoom={setZoom}
      pandx={dx}
      pandy={dy}
      onPan={onPan}
      rotation={0}
      key={`${dx}-${zoom}`}
    >
      <img
        onClick={onImageClick}
        className="block w-full"
        src={imgSrc}
        alt={imgAlt}
      />
    </PanViewer>
  );
}

export default ZoomPanViewer;
