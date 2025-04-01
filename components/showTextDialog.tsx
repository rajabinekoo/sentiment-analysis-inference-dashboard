'use client';

import React from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog';

interface ShowTextDialog {
  review: IReview;
}

export const ShowTextDialog: React.FC<ShowTextDialog> = ({ review }) => {
  return (
    <Dialog>
      <DialogTrigger className='w-full'>
        <Button className='w-full' size='sm' variant='secondary'>
          Show Text
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Review Text</DialogTitle>
          <DialogDescription className='mt-2'>{review.body}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
