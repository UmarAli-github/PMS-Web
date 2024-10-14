import { Booking, Room } from '@prisma/client';
import React from 'react';

import { Bookings } from '@/features/bookings';
import { PageTemplate } from '@/features/common/page-template';
import { prisma } from '@/lib/db';
import { sanitize } from '@/utils/sanitize';

export const dynamic = 'force-dynamic';

const Page = async () => {
  const [rooms, bookings]: [Room[], Booking[]] = await Promise.all([
    prisma.room.findMany().then(sanitize),
    prisma.booking.findMany().then(sanitize),
  ]);

  return (
    <PageTemplate title="Bookings">
      <Bookings rooms={rooms} bookings={bookings} />
    </PageTemplate>
  );
};

export default Page;
