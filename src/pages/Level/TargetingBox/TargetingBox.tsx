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
  children: React.ReactNode;
};

function TargetingBox({
  imageDimensions,
  charactersFound,
  isShow,
  onSelect,
  children,
}: TargetingBoxProps) {
  if (!imageDimensions || !isShow) {
    return <div className="relative">{children}</div>;
  }

  const characters = Object.keys(charactersFound) as Character[];
  const { imageX, imageY, imageWidth, imageHeight } = imageDimensions;
  const translateX = imageWidth - imageX < 52 ? '-translate-x-full' : '';
  const translateY = imageHeight - imageY < 152 ? '-translate-y-full' : '';

  return (
    <div className="relative">
      <ul
        className={`absolute z-20 flex flex-col divide-y-2 divide-red border-2 border-red shadow-lg ${translateX} ${translateY}`}
        style={{ top: imageY, left: imageX }}
        role="menu"
        aria-label="select character you found"
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
              data-cy={`${character.toLowerCase()}-menubutton`}
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
      {children}
    </div>
  );
}

export default TargetingBox;
