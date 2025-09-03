import { z } from 'zod';

const createReservationZodSchema = z.object({
  body: z.object({
    customerName: z.string({
      required_error: 'Customer name is required',
    }),
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email('Invalid email format'),
    phone: z.string({
      required_error: 'Phone number is required',
    }),
    headCount: z
      .number({
        required_error: 'Head count is required',
      })
      .min(1, 'Head count must be at least 1'),
    date: z.string({
      required_error: 'Date is required',
    }),
    time: z.string({
      required_error: 'Time is required',
    }),
  }),
});

const updateReservationZodSchema = z.object({
  body: z.object({
    customerName: z.string().optional(),
    email: z.string().email('Invalid email format').optional(),
    phone: z.string().optional(),
    headCount: z.number().min(1, 'Head count must be at least 1').optional(),
    status: z
      .enum(['upcoming', 'completed', 'cancelled'] as const)
      .optional(),
    date: z.string().optional(),
    time: z.string().optional(),
  }),
});

export const ReservationValidation = {
  createReservationZodSchema,
  updateReservationZodSchema,
};
