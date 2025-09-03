import { model, Schema } from 'mongoose';
import { IUser } from './user.interface';

const userSchema = new Schema<IUser>(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    userImg: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const User = model<IUser>('User', userSchema);
