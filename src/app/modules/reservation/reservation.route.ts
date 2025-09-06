import express from 'express';
import { ReservationController } from './reservation.controller';

const router = express.Router();

router.post('/create-reservation', ReservationController.createReservation);
router.get('/', ReservationController.getAllReservations);
router.put('/update-reservation/:id', ReservationController.reservationUpdate);

export const ReservationRoutes = router;
