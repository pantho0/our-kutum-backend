import express from 'express';
import { ReservationController } from './reservation.controller';

const router = express.Router();

router.post('/create-reservation', ReservationController.createReservation);
router.get('/', ReservationController.getAllReservations);

export const ReservationRoutes = router;
