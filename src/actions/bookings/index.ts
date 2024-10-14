'use server';

import { BookingFormSchema } from '@/features/bookings/booking-dialog/booking-form/booking-form.utils';
import { prisma } from '@/lib/db';

export const createBookingAction = async (values: BookingFormSchema) => {
  const { room, ...restValues } = values;

  // Check for overlapping bookings
  const overlappingBooking = await prisma.booking.findFirst({
    where: {
      roomId: room.id,
      AND: [
        {
          from: {
            lte: values.to,
          },
        },
        {
          to: {
            gte: values.from,
          },
        },
      ],
    },
  });

  if (overlappingBooking)
    throw new Error(
      'There is an existing booking that overlaps with the requested time.'
    );

  await prisma.booking.create({
    data: {
      ...restValues,
      roomId: room.id,
    },
  });
};

export const deleteBookingAction = async (bookingId: number) => {
  await prisma.booking.delete({
    where: {
      id: bookingId,
    },
  });
};
