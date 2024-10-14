import React from 'react';

import { PageTemplate } from '@/features/common/page-template';
import { Rooms } from '@/features/rooms';

export const dynamic = 'force-dynamic';

const Page = () => {
  return (
    <PageTemplate title="Rooms">
      <Rooms />
    </PageTemplate>
  );
};

export default Page;
