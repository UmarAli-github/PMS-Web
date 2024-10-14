import React from 'react';

import { Bookings } from '@/features/bookings';
import { PageTemplate } from '@/features/common/page-template';
import { prisma } from '@/lib/db';

const Page = async () => {
  const [rooms, bookings] = await Promise.all([
    prisma.room.findMany(),
    prisma.booking.findMany(),
  ]);

  return (
    <PageTemplate title="Bookings">
      <Bookings rooms={rooms} bookings={bookings} />
    </PageTemplate>
  );
};

export default Page;
