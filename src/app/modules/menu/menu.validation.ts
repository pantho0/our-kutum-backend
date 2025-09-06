import { z } from 'zod';
import { Types } from 'mongoose';

export const menuValidationSchema = z.object({
  category: z.string().refine(val => Types.ObjectId.isValid(val), {
    message: 'Invalid category ObjectId',
  }),
  itemName: z
    .string()
    .min(1, { message: 'Item name is required' })
    .max(100, { message: 'Item name too long' }),
  price: z.number().positive({ message: 'Price must be a positive number' }),
  description: z
    .string()
    .min(5, { message: 'Description must be at least 5 characters long' }),
  image: z.string().url({ message: 'Image must be a valid URL' }),
  isDeleted: z.boolean().optional().default(false),
});

export const updateMenuSchema = z.object({
  category: z
    .string()
    .refine(val => Types.ObjectId.isValid(val), {
      message: 'Invalid category ObjectId',
    })
    .optional(),
  itemName: z.string().max(100, { message: 'Item name too long' }).optional(),
  price: z
    .number()
    .positive({ message: 'Price must be a positive number' })
    .optional(),
  description: z
    .string()
    .min(5, { message: 'Description must be at least 5 characters long' })
    .optional(),
  image: z.string().url({ message: 'Image must be a valid URL' }).optional(),
  isDeleted: z.boolean().optional(),
});
