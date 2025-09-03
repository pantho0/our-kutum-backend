import { Schema, model } from 'mongoose';
import { IReservation } from './reservation.interface';

const reservationSchema = new Schema<IReservation>(
  {
    customerName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    headCount: {
      type: Number,
      required: true,
      min: 1,
    },
    status: {
      type: String,
      enum: ['upcoming', 'completed', 'cancelled'],
      default: 'upcoming',
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Reservation = model<IReservation>(
  'Reservation',
  reservationSchema,
);
