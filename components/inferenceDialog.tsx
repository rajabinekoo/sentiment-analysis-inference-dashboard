'use client';

import React from 'react';

import { predictionLabel } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useInference } from '@/apis/hooks/inference.hook';
import { useErrorHandler } from '@/hooks/errorHandler.hook';
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog';

interface IInferenceDialogProps {
  review: IReview;
}

export const InferenceDialog: React.FC<IInferenceDialogProps> = ({
  review,
}) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [prediction, setPrediction] = React.useState<number>();

  const inference = useInference();
  const { checkServerError } = useErrorHandler();

  const predict = async () => {
    try {
      const result = await inference.mutateAsync({
        queries: [review.body.toLowerCase().trim()],
      });
      if (!Array.isArray(result)) return;
      setPrediction(result[0].prediction);
    } catch (e) {
      checkServerError(e);
    }
  };

  React.useEffect(() => {
    if (!open) return;
    if (prediction !== undefined) return;
    predict().catch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prediction, open]);

  return (
    <Dialog onOpenChange={setOpen}>
      <DialogTrigger className='w-full'>
        <Button className='w-full' size='sm'>
          Use Inference
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Inference</DialogTitle>
          <DialogDescription className='mt-3'>
            <p>
              Prediction:{' '}
              {prediction !== undefined
                ? predictionLabel(prediction)
                : 'Loading...'}
            </p>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
