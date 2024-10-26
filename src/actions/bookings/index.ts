'use server';

import { BookingFormSchema } from '@/features/bookings/booking-dialog/booking-form/booking-form.utils';
import { prisma } from '@/lib/db';

export const createBookingAction = async (values: BookingFormSchema) => {
  const { bed, payment, ...restValues } = values;

  // Check for overlapping bookings
  const overlappingBooking = await prisma.booking.findFirst({
    where: {
      bedId: bed.id,
      AND: [
        {
          from: {
            lt: values.to,
          },
        },
        {
          to: {
            gt: values.from,
          },
        },
      ],
    },
  });

  if (overlappingBooking)
    throw new Error(
      'There is an existing booking that overlaps with the requested time.'
    );

  const booking = await prisma.booking.create({
    data: {
      ...restValues,
      bedId: bed.id,
    },
  });

  await prisma.payment.create({
    data: {
      ...payment,
      bookingId: booking.id,
    },
  });
};

export const deleteBookingAction = async (bookingId: number) => {
  await prisma.payment.delete({
    where: {
      bookingId,
    },
  });
  await prisma.booking.delete({
    where: {
      id: bookingId,
    },
  });
};
