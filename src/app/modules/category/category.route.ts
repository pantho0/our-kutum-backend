import { Router } from 'express';
import { categoryControllers } from './category.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createCategorySchema } from './category.validation';

const router = Router();

router.post(
  '/',
  validateRequest(createCategorySchema),
  categoryControllers.createCategory,
);
router.get('/', categoryControllers.getAllCategory);

export const CategoryRoutes = router;
