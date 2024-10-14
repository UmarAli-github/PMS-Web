import React from 'react';

import { prisma } from '@/lib/db';

import { RoomsDataTable } from './rooms-data-table';

export const Rooms = async () => {
  const rooms = await prisma.room.findMany();

  return <RoomsDataTable rooms={rooms} />;
};
