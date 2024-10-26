import { BookingStatus } from '@prisma/client';
import { z } from 'zod';

export const bookingFormSchema = z.object({
  bed: z.object({
    id: z.number(),
    name: z.string(),
  }),
  from: z.date(),
  to: z.date(),
  name: z.string(),
  dob: z.date(),
  gender: z.enum(['male', 'female', 'neither', 'prefer_not_to_say']),
  status: z.nativeEnum(BookingStatus),
  payment: z.object({
    card: z.coerce.number().min(0),
    cash: z.coerce.number().min(0),
  }),
  idType: z.enum(['cnic', 'driver_license', 'passport']),
  idNo: z.string(),
});

export type BookingFormSchema = z.infer<typeof bookingFormSchema>;
