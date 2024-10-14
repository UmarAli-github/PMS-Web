import React from 'react';

import { prisma } from '@/lib/db';
import { sanitize } from '@/utils/sanitize';

import { RoomsDataTable } from './rooms-data-table';

export const Rooms = async () => {
  const rooms = await prisma.room.findMany().then(sanitize);

  return <RoomsDataTable rooms={rooms} />;
};
