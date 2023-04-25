import { useState } from 'react';
import { PanViewer } from 'react-image-pan-zoom-rotate';

export type ZoomPanViewerProps = {
  children: React.ReactNode;
};

function ZoomPanViewer({ children }: ZoomPanViewerProps) {
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
      {children}
    </PanViewer>
  );
}

export default ZoomPanViewer;
