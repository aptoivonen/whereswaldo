import { MouseEventHandler, useState } from 'react';
import { Container, ZoomPanViewer } from '@/components/common';
import getImageClickPosition from './getImageClickPosition';
import useLevel from './useLevel';
import { CHARACTER_IMG } from '@/constants/constants';
import { Character } from '@/model/types';

type LevelViewerProps = {
  levelId: string;
};

function LevelViewer({ levelId }: LevelViewerProps) {
  const level = useLevel(levelId);
  const characters = level.data
    ? (Object.keys(level.data.characterCoordinates) as Character[])
    : [];
  const [characterFound, setCharacterFound] = useState(() =>
    level.data
      ? (Object.fromEntries(characters.map((key) => [key, false])) as {
          [K in Character]?: false;
        })
      : {}
  );

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
      <div className="flex h-full flex-col">
        <header>
          <Container>
            <div className="flex h-20 items-center sm:h-28">
              <time>1:20</time>
              <div>
                <span>{level.data.title}</span>
                {characters.map((character) => (
                  <img
                    key={character}
                    src={CHARACTER_IMG[character]}
                    alt={character}
                  />
                ))}
              </div>
            </div>
          </Container>
        </header>
        <div className="flex-1 overflow-hidden">
          <ZoomPanViewer
            onImageClick={handleImageClick}
            imgSrc={level.data.imgUrl}
            imgAlt={level.data.title}
          />
        </div>
      </div>
    </>
  );
}

export default LevelViewer;
