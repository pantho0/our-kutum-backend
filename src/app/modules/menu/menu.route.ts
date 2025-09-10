import { Router } from 'express';
import { menuControllers } from './menu.controller';
import validateRequest from '../../middlewares/validateRequest';
import { menuValidationSchema, updateMenuSchema } from './menu.validation';

const router = Router();

router.post(
  '/create-menu',
  validateRequest(menuValidationSchema),
  menuControllers.createMenu,
);
router.get('/', menuControllers.getAllMenu);
router.get('/:id', menuControllers.getSingleMenu);
router.put(
  '/:id',
  validateRequest(updateMenuSchema),
  menuControllers.updateMenu,
);
router.get('/deleted', menuControllers.getDeletedMenus);
router.delete('/:id', menuControllers.deleteMenu);
export const MenuRoutes = router;
