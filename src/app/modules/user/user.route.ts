import { Router } from 'express';
import { userControllers } from './user.controller';

const router = Router();

router.post('/', userControllers.createUser);
router.get('/', userControllers.getAllUser);
router.patch('/change-role', userControllers.changeUserRole);

export const UserRoutes = router;
