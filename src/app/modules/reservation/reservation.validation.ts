import { z } from 'zod';

export const reservationStatusEnum = z.enum([
  'upcoming',
  'completed',
  'cancelled',
]);

export const createReservationSchema = z.object({
  body: z.object({
    customerName: z.string().min(1, { message: 'Customer name is required' }),
    email: z.string().email({ message: 'Invalid email format' }),
    phone: z
      .string()
      .min(7, { message: 'Phone number too short' })
      .max(20, { message: 'Phone number too long' }),
    headCount: z
      .number()
      .int({ message: 'Head count must be an integer' })
      .min(1, { message: 'Head count must be at least 1' }),
    status: reservationStatusEnum.default('upcoming'),
    date: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, {
        message: 'Date must be in YYYY-MM-DD format',
      }),
    time: z
      .string()
      .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
        message: 'Time must be in HH:mm format',
      }),
  }),
});

export const updateReservationSchema = z.object({
  body: z.object({
    customerName: z.string().optional(),
    email: z.string().email({ message: 'Invalid email format' }).optional(),
    phone: z.string().min(7).max(20).optional(),
    headCount: z.number().int().min(1).optional(),
    status: reservationStatusEnum.optional(),
    date: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .optional(),
    time: z
      .string()
      .regex(/^([01]\d|2[0-3]):([0-5]\d)$/)
      .optional(),
  }),
});
