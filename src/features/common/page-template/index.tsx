import React from 'react';

import { PropsWithChildren } from '@/types/common';

export const PageTemplate = ({
  title,
  children,
}: PropsWithChildren<{
  title: string;
}>) => {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
      </div>
      {children}
    </div>
  );
};
