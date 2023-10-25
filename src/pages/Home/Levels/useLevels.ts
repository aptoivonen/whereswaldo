import backendApi from '@/api/backendApi';
import { LevelInfoArraySchema } from '@/model/schemas';
import schemaParse from '@/utils/helpers/schemaParse';
import useTypedQuery from '@/hooks/useTypedQuery';

async function getLevels() {
  const levelsData = await backendApi.getAll('levels');
  return schemaParse(LevelInfoArraySchema, levelsData);
}

function useLevels() {
  const queryFn = getLevels;
  const queryKey = ['levels'];
  return useTypedQuery(queryKey, queryFn);
}

export default useLevels;
