/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Character } from '@/model/types';
import { CHARACTER_IMG } from '@/constants/constants';

type TargetingBoxProps = {
  location: [number, number] | null;
  characters: Character[];
  isShow: boolean;
  onSelect: (character: Character) => void;
};

function TargetingBox({
  location,
  characters,
  isShow,
  onSelect,
}: TargetingBoxProps) {
  const [x, y] = location ?? [0, 0];

  if (!location || !isShow) {
    return null;
  }

  return (
    <div
      className="absolute z-20 flex flex-col divide-y-2 divide-red border-2 border-red shadow-lg"
      style={{ top: y, left: x }}
      role="menu"
    >
      {characters.map((character) => (
        <div
          className="bg-white p-1 hover:bg-blue"
          key={character}
          onClick={() => onSelect(character)}
          role="menuitem"
          tabIndex={0}
        >
          <img
            className="h-10 w-10 cursor-pointer object-cover"
            src={CHARACTER_IMG[character]}
            alt={character}
            title={`I found ${character}!`}
          />
        </div>
      ))}
    </div>
  );
}

export default TargetingBox;
