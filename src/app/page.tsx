import React from 'react';

import { PageTemplate } from '@/features/common/page-template';
import { Dashboard } from '@/features/dashboard';

const Page = () => {
  return (
    <PageTemplate title="Dashboard">
      <Dashboard />
    </PageTemplate>
  );
};

export default Page;
