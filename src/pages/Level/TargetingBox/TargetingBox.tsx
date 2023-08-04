import type { Character } from '@/model/schemas';
import type { CharactersFound } from '../types/types';
import { CHARACTER_IMG } from '@/constants/constants';

type TargetingBoxProps = {
  imageDimensions: {
    imageX: number;
    imageY: number;
    imageWidth: number;
    imageHeight: number;
  } | null;
  charactersFound: CharactersFound;
  isShow: boolean;
  onSelect: (character: Character) => void;
};

function TargetingBox({
  imageDimensions,
  charactersFound,
  isShow,
  onSelect,
}: TargetingBoxProps) {
  if (!imageDimensions || !isShow) {
    return null;
  }

  const characters = Object.keys(charactersFound) as Character[];
  const { imageX, imageY, imageWidth, imageHeight } = imageDimensions;
  const translateX = imageWidth - imageX < 52 ? '-translate-x-full' : '';
  const translateY = imageHeight - imageY < 152 ? '-translate-y-full' : '';

  return (
    <ul
      className={`absolute z-20 flex flex-col divide-y-2 divide-red border-2 border-red shadow-lg ${translateX} ${translateY}`}
      style={{ top: imageY, left: imageX }}
      role="menu"
    >
      {characters.map((character) => (
        <li key={character} role="menuitem">
          <button
            className={`h-11 w-11 bg-white px-1 hover:bg-blue ${
              charactersFound[character] ? 'brightness-50' : ''
            }`}
            type="button"
            onClick={() => onSelect(character)}
            tabIndex={0}
            disabled={charactersFound[character]}
          >
            <img
              className="cursor-pointer object-cover"
              src={CHARACTER_IMG[character]}
              alt={character}
              title={`I found ${character}!`}
            />
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TargetingBox;
