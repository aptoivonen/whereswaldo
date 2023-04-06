import { Link } from 'react-router-dom';
import { LevelInfo } from '@/model/types';

type LevelCardProps = {
  level: LevelInfo;
};

function LevelCard({ level }: LevelCardProps) {
  return (
    <Link to={`level/${level.id}`}>
      <div className="flex flex-col border-8 border-blue">
        <div className="relative pb-[50%]">
          <img
            className="absolute block h-full w-full object-cover"
            src={level.thumbnailUrl}
            alt={`${level.title} Level`}
          />
        </div>
        <p className="bg-blue p-2 text-xl text-white">{level.title}</p>
      </div>
    </Link>
  );
}

export default LevelCard;
