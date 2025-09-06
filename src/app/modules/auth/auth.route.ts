import { Router } from 'express';
import { AuthController } from './auth.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.const';

const router = Router();

router.post('/login', AuthController.login);
router.post(
  '/change-password',
  auth(USER_ROLE.admin, USER_ROLE.user),
  AuthController.changePassword,
);
router.post('/forget-password', AuthController.forgetPassword);
router.post('/reset-password', AuthController.resetPassword);
router.post(
  '/access-token',
  AuthController.accessTokenGenerateWithRefreshToken,
);

export const AuthRoutes = router;
