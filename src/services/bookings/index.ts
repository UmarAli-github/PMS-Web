import { prisma } from '@/lib/db';
import { sanitize } from '@/utils/sanitize';

export const getAllBookings = () =>
  prisma.booking
    .findMany({
      include: {
        payment: true,
        bed: {
          select: {
            name: true,
          },
        },
      },
    })
    .then(sanitize);

export type GetAllBookingsResponse = Awaited<ReturnType<typeof getAllBookings>>;
