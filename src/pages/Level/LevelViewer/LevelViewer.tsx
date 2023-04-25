/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { MouseEventHandler, useState } from 'react';
import { ZoomPanViewer } from '@/components/common';
import Header from '../Header/Header';
import { Character } from '@/model/types';
import useLevel from './useLevel';
import useTimer from './useTimer';
import getImageClickPosition from './getImageClickPosition';
import isNearby from './isNearby';
import formatTime from '@/utils/helpers/formatTime';
import TargetingBox from '../TargetingBox/TargetingBox';

type LevelViewerProps = {
  levelId: string;
};

function LevelViewer({ levelId }: LevelViewerProps) {
  const level = useLevel(levelId);
  const time = formatTime(useTimer());
  const [isShowTargetingBox, setIsShowTargetingBox] = useState(false);
  const [clickedLocation, setClickedLocation] = useState<
    [number, number] | null
  >(null);
  const [zoom, setZoom] = useState(1);

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
    const { imageX, imageY } = getImageClickPosition(e, zoom);
    setClickedLocation([imageX, imageY]);

    setIsShowTargetingBox((isShow) => !isShow);

    console.log('clicked location', { imageX, imageY, zoom });
  };

  const handleSelect = (character: Character) => {
    // TODO: logic here
    console.log('selected and location', { character, clickedLocation });

    setIsShowTargetingBox(false);
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
        <Header.Time>{time}</Header.Time>
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
          onZoom={(newZoom) => {
            setIsShowTargetingBox(false);
            setZoom(newZoom);
          }}
        >
          <div className="relative">
            <TargetingBox
              location={clickedLocation}
              characters={characters}
              isShow={isShowTargetingBox}
              onSelect={handleSelect}
            />
            <img
              src={level.data.imgUrl}
              alt={level.data.title}
              onClick={handleImageClick}
            />
          </div>
        </ZoomPanViewer>
      </div>
    </div>
  );
}

export default LevelViewer;
