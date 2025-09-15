import { Router } from 'express';

import { UserRoutes } from '../modules/user/user.route';
import { CategoryRoutes } from '../modules/category/category.route';
import { MenuRoutes } from '../modules/menu/menu.route';
import { ReservationRoutes } from '../modules/reservation/reservation.route';
import { AuthRoutes } from '../modules/auth/auth.route';

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
  {
    path: '/auth',
    route: AuthRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
