import backendApi from '@/api/backendApi';
import { ScoresSchema } from '@/model/schemas';
import schemaParse from '@/utils/helpers/schemaParse';
import useTypedQuery from '@/hooks/useTypedQuery';

async function getScores() {
  const scoresData = await backendApi.getAll('scores');
  return schemaParse(ScoresSchema, scoresData);
}

function useScores() {
  const queryFn = getScores;
  const queryKey = ['scores'];

  return useTypedQuery(queryKey, queryFn);
}

export default useScores;
