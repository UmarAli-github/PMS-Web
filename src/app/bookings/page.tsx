import React from 'react';

import { Bookings } from '@/features/bookings';
import { PageTemplate } from '@/features/common/page-template';
import { getAllBeds } from '@/services/beds';
import { getAllBookings } from '@/services/bookings';

export const dynamic = 'force-dynamic';

const Page = async () => {
  const [beds, bookings] = await Promise.all([getAllBeds(), getAllBookings()]);

  return (
    <PageTemplate title="Bookings">
      <Bookings beds={beds} bookings={bookings} />
    </PageTemplate>
  );
};

export default Page;
