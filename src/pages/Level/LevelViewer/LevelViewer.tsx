import { MouseEventHandler, useState } from 'react';
import { ZoomPanViewer } from '@/components/common';
import Header from '../Header/Header';
import { Character } from '@/model/types';
import useLevel from './useLevel';
import getImageClickPosition from './getImageClickPosition';
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

  const allCharactersFound = Object.values(charactersFound).every(Boolean);
  if (allCharactersFound) {
    // TODO: game won, call sender returned by useSendScore and then
    // TODO: täytyy vissiin laittaa clickerhandleriin
  }

  // TODO: tee targeting box, jossa valitaan hahmo ja sitten löytyi tai toast 'ei löytynyt'
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
      <Header>
        <Header.Time>1:20</Header.Time>
        <Header.ItemContainer>
          <Header.Title>{level.data.title}</Header.Title>
          <Header.IconContainer>
            {characters.map((character) => (
              <Header.Icon
                key={character}
                character={character}
                isFound={!!charactersFound[character]}
              />
            ))}
          </Header.IconContainer>
        </Header.ItemContainer>
        <Header.Quit>Quit</Header.Quit>
      </Header>
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
