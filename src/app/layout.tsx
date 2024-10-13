import './globals.css';

import type { Metadata } from 'next';

import { RootLayout } from '@/layouts/root-layout';
import { PropsWithChildren } from '@/types/common';

export const metadata: Metadata = {
  title: 'PMS Web',
  description: 'Booking and management system',
};

const Layout = ({ children }: PropsWithChildren) => {
  return <RootLayout>{children}</RootLayout>;
};

export default Layout;
