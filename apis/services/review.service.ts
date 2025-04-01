import { getHttpClient } from '@/apis/client';
import { apiUrls } from '@/lib/urls';

type getReviewsList = (_?: IPagination) => Promise<IListResponse<IReview>>;
export const getReviewsList: getReviewsList = async (params) => {
  const httpClient = getHttpClient();
  const response = await httpClient.get<IListResponse<IReview>>(
    apiUrls.review,
    {
      params: {
        cursor: params?.cursor || undefined,
        limit:
          params?.limit ||
          Number(process.env.NEXT_PUBLIC_DEFAULT_LIST_LIMITS || 0),
      },
    },
  );
  return response.data;
};
