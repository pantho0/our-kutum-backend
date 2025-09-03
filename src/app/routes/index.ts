import { Router } from 'express';
import path from 'path';
import { UserRoutes } from '../modules/user/user.route';
import { CategoryRoutes } from '../modules/category/category.route';
import { MenuRoutes } from '../modules/menu/menu.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/categories',
    route: CategoryRoutes,
  },
  {
    path: '/menus',
    route: MenuRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
