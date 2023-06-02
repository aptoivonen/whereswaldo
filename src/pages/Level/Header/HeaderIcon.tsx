import { Character } from '@/model/types';
import { CHARACTER_IMG } from '@/constants/constants';

type HeaderIconProps = {
  character: Character;
  isFound: boolean;
};

function HeaderIcon({ character, isFound }: HeaderIconProps) {
  return (
    <img
      className={`h-8 w-8 object-cover  sm:h-10 sm:w-10 ${
        isFound ? 'brightness-50' : ''
      }`}
      key={character}
      src={CHARACTER_IMG[character]}
      alt={character}
      title={character}
    />
  );
}

export default HeaderIcon;
