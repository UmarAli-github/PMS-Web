'use server';

import { RoomFormSchema } from '@/features/rooms/rooms-data-table/add-room-modal/add-room-modal-form/add-room-modal-form.utils';
import { prisma } from '@/lib/db';

export const createRoomAction = async ({ capacity, name }: RoomFormSchema) => {
  await prisma.room.create({
    data: {
      name,
      beds: {
        createMany: {
          data: Array.from({ length: capacity }).map((_, i) => ({
            name: `${name}-${i + 1}`,
          })),
        },
      },
    },
  });
};

export const deleteRoomAction = async (roomId: number) => {
  // if there are bookings for this rooms beds, we should not allow to delete the room
  const bookings = await prisma.booking.findMany({
    where: {
      bed: {
        roomId,
      },
    },
  });
  if (bookings.length > 0) throw new Error('Cannot delete room with bookings');
  await prisma.bed.deleteMany({
    where: {
      roomId,
    },
  });
  await prisma.room.delete({
    where: {
      id: roomId,
    },
  });
};
