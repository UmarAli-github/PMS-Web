import { prisma } from '@/lib/db';
import { sanitize } from '@/utils/sanitize';

export const getAllBeds = async () =>
  prisma.bed
    .findMany({
      orderBy: {
        name: 'asc',
      },
    })
    .then(sanitize);

export type GetAllBedsResponse = Awaited<ReturnType<typeof getAllBeds>>;
