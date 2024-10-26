import React from 'react';

import { getAllRooms } from '@/services/rooms';

import { RoomsDataTable } from './rooms-data-table';

export const Rooms = async () => {
  const rooms = await getAllRooms();

  return <RoomsDataTable rooms={rooms} />;
};
