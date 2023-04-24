import { MouseEventHandler, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, ZoomPanViewer } from '@/components/common';
import getImageClickPosition from './getImageClickPosition';
import useLevel from './useLevel';
import { CHARACTER_IMG } from '@/constants/constants';
import { Character } from '@/model/types';
import isNearby from './isNearby';

type LevelViewerProps = {
  levelId: string;
};

function LevelViewer({ levelId }: LevelViewerProps) {
  const level = useLevel(levelId);
  const characters = level.data
    ? (Object.keys(level.data.characterCoordinates) as Character[])
    : [];
  const [charactersFound, setCharactersFound] = useState(() =>
    level.data
      ? (Object.fromEntries(characters.map((key) => [key, false])) as {
          [K in Character]?: false;
        })
      : {}
  );

  const handleImageClick: MouseEventHandler<HTMLImageElement> = (e) => {
    const [imagePercentageX, imagePercentageY] = getImageClickPosition(e);
    const [characterX, characterY] = level.data?.characterCoordinates.Waldo ?? [
      0, 0,
    ];
    const isWaldoNearby = isNearby({
      clickedImagePercentageX: imagePercentageX,
      clickedImagePercentageY: imagePercentageY,
      characterX,
      characterY,
      foundAcceptanceRadius: level.data?.foundAcceptanceRadius ?? 0,
    });
    console.log('is Waldo near', isWaldoNearby);

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
    <div className="flex h-full flex-col">
      <header className="bg-light">
        <Container>
          <div className="flex h-20 items-center justify-between sm:h-28">
            <time
              className="text-2xl sm:text-4xl"
              title="Running time on the level."
            >
              1:20
            </time>
            <div className="flex items-center">
              <h1 className="text-xl" title="Level name">
                {level.data.title}
              </h1>
              <div className="ml-4 flex space-x-2">
                {characters.map((character) => (
                  <img
                    className={`h-8 w-8 object-cover  sm:h-10 sm:w-10 ${
                      charactersFound[character] ? 'brightness-50' : ''
                    }`}
                    key={character}
                    src={CHARACTER_IMG[character]}
                    alt={character}
                    title={character}
                  />
                ))}
              </div>
            </div>
            <Link className="text-xl text-red" to="/">
              Quit
            </Link>
          </div>
        </Container>
      </header>
      <div className="flex-1 overflow-hidden bg-blue">
        <ZoomPanViewer
          onImageClick={handleImageClick}
          imgSrc={level.data.imgUrl}
          imgAlt={level.data.title}
        />
      </div>
    </div>
  );
}

export default LevelViewer;
