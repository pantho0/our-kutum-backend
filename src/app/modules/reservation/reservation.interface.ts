export type ReservationStatus = 'upcoming' | 'completed' | 'cancelled';

export type IReservation = {
  customerName: string;
  email: string;
  phone: string;
  headCount: number;
  status: ReservationStatus;
  date: string; // ISO date string
  time: string; // in 24h format like '14:30'
};
