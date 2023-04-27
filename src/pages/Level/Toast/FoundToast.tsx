import { Toast } from '@/components/common';
import { CHARACTER_IMG } from '@/constants/constants';
import { Character } from '@/model/types';

type FoundToastProps = {
  character: Character;
};

function FoundToast({ character }: FoundToastProps) {
  return (
    <Toast variant="success">
      <span className="flex items-center">
        {`You found ${character}!`}
        <img
          className="ml-4 h-10 w-10 object-cover"
          src={CHARACTER_IMG[character]}
          alt={character}
          title={`${character} found!`}
        />
      </span>
    </Toast>
  );
}

export default FoundToast;
