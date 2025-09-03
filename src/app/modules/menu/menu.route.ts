import { Router } from 'express';
import { menuControllers } from './menu.controller';

const router = Router();

router.post('/create-menu', menuControllers.createMenu);
router.get('/', menuControllers.getAllMenu);

export const MenuRoutes = router;
