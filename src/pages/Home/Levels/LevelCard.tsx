import { Link } from 'react-router-dom';
import type { LevelInfo } from '@/model/schemas';
import Card from '@/components/common/Card';
import { CHARACTER_IMG } from '@/constants/constants';

type LevelCardProps = {
  level: LevelInfo;
};

function LevelCard({ level }: LevelCardProps) {
  const titleId = `card-title-${level.id}`;
  return (
    <Link to={`level/${level.id}`} aria-labelledby={titleId}>
      <Card className="border-8 border-blue">
        <Card.Img
          className="aspect-h-1 aspect-w-2"
          src={level.thumbnailUrl}
          alt={`${level.title} Level`}
        />
        <Card.Title className="bg-blue text-white">
          <div className="flex items-center">
            <h2 id={titleId}>{level.title}</h2>
            <div className="ml-auto flex h-6 space-x-1">
              {[...level.characters].map((character) => (
                <img
                  className="block h-6 w-6 object-cover"
                  key={character}
                  src={CHARACTER_IMG[character]}
                  alt={character}
                  title={`${character} is hiding in this level.`}
                />
              ))}
            </div>
          </div>
        </Card.Title>
      </Card>
    </Link>
  );
}

export default LevelCard;
