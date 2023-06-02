import { Toast } from '@/components/common';
import { CHARACTER_IMG } from '@/constants/constants';
import { Character } from '@/model/types';

type FoundToastProps = {
  character: Character;
  isFound: boolean;
};

function FoundToast({ character, isFound }: FoundToastProps) {
  const variant = isFound ? 'success' : 'danger';
  const text = isFound
    ? `You found ${character}!`
    : `${character} is not there!`;

  return (
    <Toast variant={variant}>
      <span className="flex items-center">
        {text}
        <img
          className="ml-4 h-10 w-10 object-cover"
          src={CHARACTER_IMG[character]}
          alt={character}
        />
      </span>
    </Toast>
  );
}

export default FoundToast;
