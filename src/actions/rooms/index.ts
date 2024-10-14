'use server';

import { RoomFormSchema } from '@/features/rooms/rooms-data-table/add-room-modal/add-room-modal-form/add-room-modal-form.utils';
import { prisma } from '@/lib/db';

export const createRoomAction = async (values: RoomFormSchema) => {
  await prisma.room.create({
    data: values,
  });
};

export const deleteRoomAction = async (roomId: number) => {
  // if there are bookings for this room, we should not allow to delete the room
  const bookings = await prisma.booking.findMany({
    where: {
      roomId,
    },
  });
  if (bookings.length > 0) throw new Error('Cannot delete room with bookings');
  await prisma.room.delete({
    where: {
      id: roomId,
    },
  });
};
