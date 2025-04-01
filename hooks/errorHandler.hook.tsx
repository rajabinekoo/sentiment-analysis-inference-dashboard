'use client';

import axios from 'axios';
import { toast } from 'sonner';
import { serverErrors } from '@/lib/messages';

export const useErrorHandler = () => {
  const checkServerError = (error: unknown): void => {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const statusCode = error.response.status;
        const errorData = error.response.data;
        let errorMessage = `${serverErrors[statusCode.toString()]} `;

        if (typeof errorData.detail === 'string') {
          errorMessage += errorData.detail;
        } else if (Array.isArray(errorData.detail)) {
          errorMessage += errorData.detail
            .map((err: { msg?: string }) => err?.msg || '')
            .join(', ');
        } else {
          errorMessage += 'An unknown error occurred.';
        }
        toast.error(errorMessage);
      } else if (error.request) {
        console.log('No response received from the server.');
      } else {
        toast.error('Axios error: ' + error.message);
      }
    } else {
      console.log('An unknown error occurred:', error);
    }
  };

  return { checkServerError };
};
