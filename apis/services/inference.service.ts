import { getHttpClient } from '@/apis/client';
import { apiUrls } from '@/lib/urls';

type inference = (_: IInferenceReqDTO) => Promise<Array<IInferenceResDTO>>;
export const inference: inference = async (body) => {
  const httpClient = getHttpClient();
  const response = await httpClient.post<Array<IInferenceResDTO>>(
    apiUrls.inference,
    body,
  );
  return response.data;
};
