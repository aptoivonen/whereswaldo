/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { MouseEventHandler, useRef, useState } from 'react';
import { ZoomPanViewer } from '@/components/common';
import Header from '../Header/Header';
import { Character, LevelGameInfo } from '@/model/types';
import useTimer from './useTimer';
import getImageClickPosition from './getImageClickPosition';
import isNearby from './isNearby';
import formatTime from '@/utils/helpers/formatTime';
import TargetingBox from '../TargetingBox/TargetingBox';
import getLocationPercentages from './getLocationPercentages';
import useThrowAsyncError from '@/hooks/useThrowAsyncError';

type LevelViewerProps = {
  level: LevelGameInfo;
};

type CharactersFound = {
  [K in Character]?: boolean;
};

function LevelViewer({ level }: LevelViewerProps) {
  const time = formatTime(useTimer());
  const [isShowTargetingBox, setIsShowTargetingBox] = useState(false);
  const [imageDimensions, setImageDimensions] = useState<{
    imageX: number;
    imageY: number;
    imageWidth: number;
    imageHeight: number;
  } | null>(null);
  const [zoom, setZoom] = useState(1);
  // To thow error to error boundary from event handlers
  const throwAsyncError = useThrowAsyncError();

  const characters = Object.keys(level.characterCoordinates) as Character[];
  const [charactersFound, setCharactersFoundState] = useState(
    Object.fromEntries(characters.map((key) => [key, false])) as CharactersFound
  );

  const charactersFoundRef = useRef(
    Object.fromEntries(characters.map((key) => [key, false])) as CharactersFound
  );
  const setCharactersFound = (
    charactersFoundSetter: (charactersFound: CharactersFound) => CharactersFound
  ) => {
    setCharactersFoundState(charactersFoundSetter);
    charactersFoundRef.current = charactersFoundSetter(charactersFound);
  };

  const handleImageClick: MouseEventHandler<HTMLImageElement> = (e) => {
    e.preventDefault();
    const newImageDimensions = getImageClickPosition(e, zoom);
    setImageDimensions(newImageDimensions);

    setIsShowTargetingBox((isShow) => !isShow);
  };

  const handleSelect = (character: Character) => {
    if (!imageDimensions) {
      throwAsyncError(
        new Error('No image dimensions when selecting character')
      );
      return;
    }
    const characterCoordinates = level.characterCoordinates[character];
    if (!characterCoordinates) {
      throwAsyncError(
        new Error(
          `No character coordinates when selecting character ${character}`
        )
      );
      return;
    }
    const [characterX, characterY] = characterCoordinates;
    const [clickedImagePercentageX, clickedImagePercentageY] =
      getLocationPercentages(imageDimensions);
    const { foundAcceptanceRadius } = level;
    const isCharacterNearby = isNearby({
      clickedImagePercentageX,
      clickedImagePercentageY,
      characterX,
      characterY,
      foundAcceptanceRadius,
    });
    if (isCharacterNearby && !charactersFound[character]) {
      setCharactersFound((charsFound) => ({
        ...charsFound,
        [character]: true,
      }));
    }
    console.log({
      character,
      x: clickedImagePercentageX,
      y: clickedImagePercentageY,
      isCharacterNearby,
    });
    console.log('stale chars found', charactersFound);
    console.log('fresh chars found', charactersFoundRef.current);

    setIsShowTargetingBox(false);
  };

  return (
    <div className="flex h-full flex-col">
      <Header>
        <Header.Time>{time}</Header.Time>
        <Header.ItemContainer>
          <Header.Title>{level.title}</Header.Title>
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
          onZoom={(newZoom) => {
            setIsShowTargetingBox(false);
            setZoom(newZoom);
          }}
        >
          <div className="relative">
            <TargetingBox
              imageDimensions={imageDimensions}
              characters={characters}
              isShow={isShowTargetingBox}
              onSelect={handleSelect}
            />
            <img
              src={level.imgUrl}
              alt={level.title}
              onContextMenu={handleImageClick}
            />
          </div>
        </ZoomPanViewer>
      </div>
    </div>
  );
}

export default LevelViewer;
