import { BookingStatus } from '@prisma/client';

export const BOOKING_STATUS: Record<
  BookingStatus,
  {
    label: string;
    color: string;
  }
> = {
  [BookingStatus.BED_UNAVAILABLE]: {
    label: 'Bed Unavailable',
    color: 'red',
  },
  [BookingStatus.BOOKED]: {
    label: 'Booked',
    color: 'yellow',
  },
  [BookingStatus.PRESENT]: {
    label: 'Present',
    color: 'green',
  },
  [BookingStatus.NO_SHOW]: {
    label: 'No Show',
    color: 'purple',
  },
  [BookingStatus.DIRECT_BOOKING]: {
    label: 'Direct Booking',
    color: 'black',
  },
};
