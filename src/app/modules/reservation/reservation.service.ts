import QueryBuilder from '../../builder/QueryBuilder';
import { IReservation } from './reservation.interface';
import { Reservation } from './reservation.model';

const createReservation = async (payload: IReservation) => {
  const result = await Reservation.create(payload);
  return result;
};

const getAllReservations = async (query: Record<string, any>) => {
  const reservationSearchableFields = ['customerName', 'phone'];

  const builder = new QueryBuilder(Reservation.find(), query)
    .search(reservationSearchableFields)
    .filter()
    .sort()
    .fields();

  const result = await builder.getPaginatedData();

  return result;
};

export const ReservationService = {
  createReservation,
  getAllReservations,
};
