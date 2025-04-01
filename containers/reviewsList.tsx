'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';

import { Button } from '@/components/ui/button';
import { useErrorHandler } from '@/hooks/errorHandler.hook';
import { ShowTextDialog } from '@/components/showTextDialog';
import { getReviewsList } from '@/apis/services/review.service';
import { InferenceDialog } from '@/components/inferenceDialog';
import {
  Card,
  CardTitle,
  CardFooter,
  CardHeader,
  CardContent,
  CardDescription,
} from '@/components/ui/card';

const truncateLength = 100;

export const ReviewsList: React.FC = () => {
  const [reviews, setReviews] = React.useState<Array<IReview>>([]);
  const [cursor, setCursor] = React.useState<string>('init');
  const [fetchedCursors, setFetchedCursors] = React.useState<{
    [key: string]: boolean;
  }>({});

  const getReviews = useQuery({
    queryKey: ['reviews-list', cursor],
    queryFn: () =>
      getReviewsList({ limit: 12, cursor: cursor === 'init' ? '' : cursor }),
  });
  const { checkServerError } = useErrorHandler();

  const changePage = React.useCallback(() => {
    if (!getReviews.isSuccess) return;
    if (!getReviews.data.cursor) return;
    setCursor(getReviews.data.cursor);
  }, [getReviews.data?.cursor, getReviews.isSuccess]);

  React.useEffect(() => {
    if (!getReviews.isSuccess) return;
    if (!getReviews.data.cursor) return;
    if (fetchedCursors[getReviews.data.cursor]) return;
    setFetchedCursors({ ...fetchedCursors, [cursor]: true });
    setReviews([...reviews, ...getReviews.data.list]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getReviews.isSuccess, cursor]);

  React.useEffect(() => {
    if (!getReviews.error) return;
    if (!getReviews.isError) return;
    checkServerError(getReviews.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getReviews.error, getReviews.isError]);

  if (!getReviews.isSuccess && !reviews.length) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <p className='text-xl font-bold'>Reviews Dataset</p>
      <section className='grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3'>
        {reviews.map((review) => (
          <Card key={review.review_id}>
            <CardHeader>
              <CardTitle
                className='max-w-full truncate'
                title={review.review_id}
              >
                ID: {review.review_id}
              </CardTitle>
              <CardDescription className='mt-1 line-clamp-2'>
                {review.body.slice(0, truncateLength)}
                {review.body.length > truncateLength
                  ? '...'
                  : '...' + ' '.repeat(truncateLength)}
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-0.5 text-sm text-gray-700'>
              <p className='truncate'>Stars: {review.stars}</p>
              <p className='truncate'>CreatedAt: {review.date}</p>
            </CardContent>
            <CardFooter>
              <div className='grid w-full grid-cols-1 gap-3 sm:grid-cols-2'>
                <InferenceDialog review={review} />
                <ShowTextDialog review={review} />
              </div>
            </CardFooter>
          </Card>
        ))}
      </section>
      <section className='flex justify-center'>
        <Button onClick={changePage} disabled={getReviews.isLoading}>
          <p>Load More</p>
        </Button>
      </section>
    </>
  );
};
