'use client';

import { Toaster } from '@/components/ui/sonner';
import { ReactQueryProvider } from '@/providers/reactQuery';

export const RootAppLayout: React.FC<childrenProps> = ({ children }) => {
  return (
    <>
      <ReactQueryProvider>{children}</ReactQueryProvider>
      <Toaster />
    </>
  );
};
