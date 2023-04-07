import { Link } from 'react-router-dom';
import { LevelInfo } from '@/model/types';
import Card from '@/components/common/Card';

type LevelCardProps = {
  level: LevelInfo;
};

function LevelCard({ level }: LevelCardProps) {
  return (
    <Link
      className="transition-transform duration-100 ease-in-out hover:scale-105 focus:scale-105"
      to={`level/${level.id}`}
    >
      <Card className="border-8 border-blue">
        <Card.Img
          className="aspect-h-1 aspect-w-2"
          src={level.thumbnailUrl}
          alt={`${level.title} Level`}
        />
        <Card.Title className="bg-blue text-white">{level.title}</Card.Title>
      </Card>
    </Link>
  );
}

export default LevelCard;
