import React from 'react';

import { PageTemplate } from '@/features/common/page-template';
import { Rooms } from '@/features/rooms';

const Page = () => {
  return (
    <PageTemplate title="Rooms">
      <Rooms />
    </PageTemplate>
  );
};

export default Page;
