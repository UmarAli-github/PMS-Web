import { z } from 'zod';

export const roomFormSchema = z.object({
  name: z.string(),
  capacity: z.coerce.number().positive().min(1),
});

export type RoomFormSchema = z.infer<typeof roomFormSchema>;
