'use client';

import { TooltipProvider } from '@/components/ui/tooltip';
import { PropsWithChildren } from '@/types/common';

import { QueryClientProvider } from './query-client-provider';
import { ThemeProvider } from './theme-provider';

interface RootLayoutProvidersProps extends PropsWithChildren {}

export const RootLayoutProviders = ({ children }: RootLayoutProvidersProps) => {
  return (
    <QueryClientProvider>
      <ThemeProvider>
        <TooltipProvider>{children}</TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};
