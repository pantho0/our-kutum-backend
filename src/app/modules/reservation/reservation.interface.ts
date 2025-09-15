export type ReservationStatus = 'upcoming' | 'completed' | 'cancelled';

export type IReservation = {
  customerName: string;
  email: string;
  phone: string;
  headCount: string;
  status?: ReservationStatus;
  date: string;
  time: string;
};
