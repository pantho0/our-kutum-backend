import { Router } from 'express';
import path from 'path';
import { UserRoutes } from '../modules/user/user.route';
import { CategoryRoutes } from '../modules/category/category.route';
import { MenuRoutes } from '../modules/menu/menu.route';
import { ReservationRoutes } from '../modules/reservation/reservation.route';

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
  {
    path: '/reservations',
    route: ReservationRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
