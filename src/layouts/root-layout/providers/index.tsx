'use client';

import { PropsWithChildren } from '@/types/common';

import { ThemeProvider } from './theme-provider';

interface RootLayoutProvidersProps extends PropsWithChildren {}

export const RootLayoutProviders = ({ children }: RootLayoutProvidersProps) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};
