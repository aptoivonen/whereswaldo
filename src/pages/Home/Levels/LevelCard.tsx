import { LevelInfo } from '@/model/types';

type LevelCardProps = {
  level: LevelInfo;
};

function LevelCard({ level }: LevelCardProps) {
  return (
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
  );
}

export default LevelCard;
