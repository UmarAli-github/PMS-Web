import { prisma } from '@/lib/db';
import { sanitize } from '@/utils/sanitize';

export const getAllRooms = async () =>
  prisma.room
    .findMany({
      include: {
        beds: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })
    .then(sanitize);

export type GetAllRoomsResponse = Awaited<ReturnType<typeof getAllRooms>>;
