export type ReservationStatus = 'upcoming' | 'completed' | 'cancelled';

export type IReservation = {
  customerName: string;
  email: string;
  phone: string;
  headCount: number;
  status: ReservationStatus;
  date: string;
  time: string;
};
