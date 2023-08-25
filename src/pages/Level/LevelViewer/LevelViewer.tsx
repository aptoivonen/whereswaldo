import { MouseEventHandler, useState } from 'react';
import { ZoomPanViewer, toast, useErrorBoundary } from '@/components/common';
import Header from '../Header/Header';
import type { Character } from '@/model/schemas';
import type Level from '@/domain/Level';
import type { CharactersFound } from '../types/types';
import formatTime from '@/utils/helpers/formatTime';
import TargetingBox from '../TargetingBox/TargetingBox';
import getLocationPercentages from './getLocationPercentages';
import FoundToast from '../Toast/FoundToast';
import NameInputView from '../NameInputView/NameInputView';
import TargetingCircle from '../TargetingCircle/TargetingCircle';
import { useRefState, useTimer } from '@/hooks';
import getZoomTransform from './getZoomTransform';

type LevelViewerProps = {
  level: Level;
};

function LevelViewer({ level }: LevelViewerProps) {
  const { counter, stop } = useTimer();
  const time = formatTime(counter);
  const [isShowTargetingBox, setIsShowTargetingBox] = useState(false);
  const [isShowNameInputView, setIsShowNameInputView] = useState(false);

  const [imageDimensions, setImageDimensions] = useState<{
    imageX: number;
    imageY: number;
    imageWidth: number;
    imageHeight: number;
  } | null>(null);
  const [zoom, setZoom] = useState(1);
  // To thow error to error boundary from event handlers
  const { showBoundary } = useErrorBoundary();

  const [charactersFound, charactersFoundRef, setCharactersFound] = useRefState(
    Object.fromEntries(
      level.characters.map((key) => [key, false])
    ) as CharactersFound
  );

  const handleImageDimensions: MouseEventHandler<HTMLElement> = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const newImageDimensions = {
      imageX: getZoomTransform(e.clientX - rect.left, zoom),
      imageY: getZoomTransform(e.clientY - rect.top, zoom),
      imageWidth: getZoomTransform(rect.width, zoom),
      imageHeight: getZoomTransform(rect.height, zoom),
    };

    setImageDimensions(newImageDimensions);
  };

  const handleImageClick: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    handleImageDimensions(e);
    setIsShowTargetingBox((isShow) => !isShow);
  };

  const handleMouseMove = handleImageDimensions;

  const handleZoom = (newZoom: number) => {
    setIsShowTargetingBox(false);
    setZoom(newZoom);
  };

  const handleSelect = (character: Character) => {
    if (!imageDimensions) {
      showBoundary(new Error('No image dimensions when selecting character'));
      return;
    }

    if (!level.has(character)) {
      showBoundary(
        new Error(
          `No character coordinates when selecting character ${character}`
        )
      );
      return;
    }
    const [clickedImagePercentageX, clickedImagePercentageY] =
      getLocationPercentages(imageDimensions);

    const isCharacterNearby = level.isCharacterNear(
      character,
      clickedImagePercentageX,
      clickedImagePercentageY
    );
    if (isCharacterNearby && !charactersFound[character]) {
      setCharactersFound((charsFound) => ({
        ...charsFound,
        [character]: true,
      }));
      toast.custom(() => <FoundToast character={character} isFound />);
    }
    if (!isCharacterNearby && !charactersFound[character]) {
      toast.custom(() => <FoundToast character={character} isFound={false} />);
    }

    const isAllCharactersFound = Object.values(
      charactersFoundRef.current
    ).every(Boolean);
    if (isAllCharactersFound) {
      stop();
      setIsShowNameInputView(true);
    }

    setIsShowTargetingBox(false);
  };

  if (isShowNameInputView) {
    return (
      <div className="flex h-full items-center justify-center bg-gradient-to-br from-light to-blue">
        <NameInputView levelId={level.id} counter={counter} />
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <Header>
        <Header.Time>{time}</Header.Time>
        <Header.ItemContainer>
          <Header.Title>{level.title}</Header.Title>
          <Header.IconContainer>
            {level.characters.map((character) => (
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
        <ZoomPanViewer onZoom={handleZoom}>
          <TargetingBox
            imageDimensions={imageDimensions}
            charactersFound={charactersFound}
            isShow={isShowTargetingBox}
            onSelect={handleSelect}
          >
            <TargetingCircle
              key={zoom}
              zoom={zoom}
              imageDimensions={imageDimensions}
              radiusPercentage={level.foundAcceptanceRadius}
              onMouseMove={handleMouseMove}
            >
              <div className="inline-block" onContextMenu={handleImageClick}>
                <img src={level.imgUrl} alt={level.title} />
              </div>
            </TargetingCircle>
          </TargetingBox>
        </ZoomPanViewer>
      </div>
    </div>
  );
}

export default LevelViewer;
