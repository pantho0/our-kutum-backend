import { z } from 'zod';

export const userRoleEnum = z.enum(['admin', 'user']);

export const createUserSchema = z.object({
  body: z.object({
    fullName: z
      .string()
      .min(1, { message: 'Full name is required' })
      .max(100, { message: 'Full name too long' }),
    email: z.string().email({ message: 'Invalid email format' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters long' }),
    userImg: z.string().url({ message: 'User image must be a valid URL' }),
    role: userRoleEnum.default('user'),
    isDeleted: z.boolean().optional().default(false),
  }),
});

export const updateUserSchema = z.object({
  body: z.object({
    fullName: z.string().max(100).optional(),
    email: z.string().email().optional(),
    password: z.string().min(6).optional(),
    userImg: z.string().url().optional(),
    role: userRoleEnum.optional(),
    passwordChagedAt: z.date().optional(),
    isDeleted: z.boolean().optional(),
  }),
});
