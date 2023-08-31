import { LevelGameInfoSchema } from '@/model/schemas';
import backendApi from '@/api/backendApi';
import schemaParse from '@/utils/helpers/schemaParse';
import Level from '@/model/Level';
import useTypedQuery from '@/hooks/useTypedQuery';

async function getLevel(levelId: string) {
  const levelData = await backendApi.get(`levels/${levelId}`);
  return new Level(schemaParse(LevelGameInfoSchema, levelData));
}

function useLevel(levelId: string) {
  const queryFn = () => getLevel(levelId);
  const queryKey = ['level', levelId];

  return useTypedQuery(queryKey, queryFn);
}

export default useLevel;
