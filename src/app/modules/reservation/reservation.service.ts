import { IReservation } from './reservation.interface';
import { Reservation } from './reservation.model';

const createReservation = async (payload: IReservation) => {
  const result = await Reservation.create(payload);
  return result;
};

const getAllReservations = async () => {
  const result = await Reservation.find();
  return result;
};

export const ReservationService = {
  createReservation,
  getAllReservations,
};
