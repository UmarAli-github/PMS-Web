import './globals.css';

import type { Metadata } from 'next';

import { PropsWithChildren } from '@/types/common';

export const metadata: Metadata = {
  title: 'PMS Web',
  description: 'Booking and management system',
};

export const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
};
