import { z } from 'zod';

export const createCategorySchema = z.object({
  body: z.object({
    catName: z
      .string()
      .min(1, { message: 'Category name is required' })
      .max(100, { message: 'Category name too long' }),
    isDeleted: z.boolean().optional().default(false),
  }),
});

export const updateCategorySchema = z.object({
  body: z.object({
    catName: z
      .string()
      .max(100, { message: 'Category name too long' })
      .optional(),
    isDeleted: z.boolean().optional(),
  }),
});
