import { Router } from 'express';
import { menuControllers } from './menu.controller';

const router = Router();

router.post('/create-menu', menuControllers.createMenu);
router.get('/', menuControllers.getAllMenu);
router.put('/:id', menuControllers.updateMenu);

export const MenuRoutes = router;
