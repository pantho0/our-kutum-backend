import { Router } from 'express';
import { userControllers } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createUserSchema, updateUserSchema } from './user.validation';

const router = Router();

router.post('/', validateRequest(createUserSchema), userControllers.createUser);
router.get('/', userControllers.getAllUser);
router.patch(
  '/change-role',
  validateRequest(updateUserSchema),
  userControllers.changeUserRole,
);
router.patch(
  '/delete-user',
  validateRequest(updateUserSchema),
  userControllers.deleteUser,
);

export const UserRoutes = router;
