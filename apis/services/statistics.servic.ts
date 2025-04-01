import { getHttpClient } from '@/apis/client';
import { apiUrls } from '@/lib/urls';

type getStatistics = () => Promise<Array<IStatistic>>;
export const getStatistics: getStatistics = async () => {
  const httpClient = getHttpClient();
  const response = await httpClient.get<Array<IStatistic>>(apiUrls.statistics);
  return response.data;
};
