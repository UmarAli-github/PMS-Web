import NextTopLoader from 'nextjs-toploader';
import React from 'react';

import { Toaster } from '@/components/ui/sonner';

export const Initializers = () => {
  return (
    <>
      <NextTopLoader color="hsl(var(--primary))" />
      <Toaster />
    </>
  );
};
