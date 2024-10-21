import { z } from 'zod';

export const bookingFormSchema = z.object({
  room: z.object({
    id: z.number(),
    name: z.string(),
    capacity: z.number(),
  }),
  from: z.date(),
  to: z.date(),
  name: z.string(),
  dob: z.date(),
  gender: z.enum(['male', 'female', 'neither', 'prefer_not_to_say']),
  price: z.coerce.number().positive().min(1),
  idType: z.enum(['cnic', 'driver_license', 'passport']),
  idNo: z.string(),
  payment: z.object({
    total: z.coerce.number().positive().min(1),
    card: z.coerce.number().gt(-1),
    cash: z.coerce.number().gt(-1),
  }),
});

export type BookingFormSchema = z.infer<typeof bookingFormSchema>;
