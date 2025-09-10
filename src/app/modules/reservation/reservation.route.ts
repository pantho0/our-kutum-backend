import express from 'express';
import { ReservationController } from './reservation.controller';
import validateRequest from '../../middlewares/validateRequest';
import {
  createReservationSchema,
  updateReservationSchema,
} from './reservation.validation';

const router = express.Router();

router.post(
  '/create-reservation',
  validateRequest(createReservationSchema),
  ReservationController.createReservation,
);
router.get('/get-all-reservation', ReservationController.getAllReservations);
router.put(
  '/update-reservation/:id',
  validateRequest(updateReservationSchema),
  ReservationController.reservationUpdate,
);

export const ReservationRoutes = router;
