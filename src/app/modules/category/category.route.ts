import { Router } from 'express';
import { categoryControllers } from './category.controller';

const router = Router();

router.post('/', categoryControllers.createCategory);
router.get('/', categoryControllers.getAllCategory);

export const CategoryRoutes = router;
