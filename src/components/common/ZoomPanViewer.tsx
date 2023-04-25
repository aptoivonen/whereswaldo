import { useState } from 'react';
import { PanViewer } from 'react-image-pan-zoom-rotate';

const noop = () => {};

export type ZoomPanViewerProps = {
  onPan?: (x: number, y: number) => void;
  onZoom?: (zoom: number) => void;
  children: React.ReactNode;
};

function ZoomPanViewer({
  onPan = noop,
  onZoom = noop,
  children,
}: ZoomPanViewerProps) {
  const [dx, setDx] = useState(0);
  const [dy, setDy] = useState(0);
  const [zoom, setActualZoom] = useState(1);

  const setZoom = (newZoom: number) => {
    onZoom(newZoom);
    setActualZoom(newZoom);
  };

  const onViewerPan = (newDx: number, newDy: number) => {
    onPan(newDx, newDy);
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
      onPan={onViewerPan}
      rotation={0}
      key={`${dx}-${zoom}`}
    >
      {children}
    </PanViewer>
  );
}

export default ZoomPanViewer;
