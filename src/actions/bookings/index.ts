'use server';

import { BookingFormSchema } from '@/features/bookings/booking-dialog/booking-form/booking-form.utils';
import { prisma } from '@/lib/db';

export const createBookingActionUpdated = async (
  values: BookingFormSchema & { people: number }
) => {
  const { room, payment, people, ...restValues } = values;

  // Check for overlapping bookings
  // const overlappingBooking = await prisma.booking.findFirst({
  //   where: {
  //     roomId: room.id,
  //     AND: [
  //       {
  //         from: {
  //           lte: values.to,
  //         },
  //       },
  //       {
  //         to: {
  //           gte: values.from,
  //         },
  //       },
  //     ],
  //   },
  // });

  // Check for overlapping bookings
  // const overbookedRoom = await prisma.room.findFirst({
  //   where: {
  //     id: room.id,
  //     AND: [
  //       {
  //         capacity: {
  //           gte: values.room.capacity,
  //         },
  //       }
  //     ],
  //   },
  // });

  // if (overlappingBooking)
  //   throw new Error(
  //     'There is an existing booking that overlaps with the requested time.'
  //   );

  const booking = await prisma.booking.create({
    data: {
      ...restValues,
      roomId: room.id,
      payment: {
        // Correct casing for the relation
        create: {
          total: payment.total,
          card: payment.card,
          cash: payment.cash,
        },
      },
    },
  });

  const dbRoom = await prisma.room.findFirst({
    where: {
      id: room.id,
    },
  });

  const previousCapacity = dbRoom?.capacity;

  console.log('previousCapacity: ', people);

  const newCapacity = previousCapacity
    ? previousCapacity - people
    : dbRoom?.capacity;

  console.log('new capacity: ', newCapacity);

  await prisma.room.update({
    where: {
      id: room.id,
    },
    data: {
      capacity: newCapacity,
    },
  });
};

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

  // if (overlappingBooking)
  //   throw new Error(
  //     'There is an existing booking that overlaps with the requested time.'
  //   );

  // await prisma.booking.create({
  //   data: {
  //     ...restValues,
  //     roomId: room.id,
  //   },
  // });
};

export const deleteBookingAction = async (bookingId: number) => {
  await prisma.booking.delete({
    where: {
      id: bookingId,
    },
  });
};
