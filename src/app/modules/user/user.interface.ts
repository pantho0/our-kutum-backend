import { Model, Types } from 'mongoose';
import { USER_ROLE } from './user.const';

export interface IUser {
  _id?: Types.ObjectId;
  fullName: string;
  email: string;
  password: string;
  userImg: string;
  role: 'admin' | 'user';
  passwordChagedAt?: Date;
  isDeleted: boolean;
}

export interface UserModel extends Model<IUser> {
  isUserExist(email: string): Promise<IUser | null>;
  isPasswordMatched(
    givenPlainTextPassword: string,
    savedHashedPassword: string,
  ): Promise<boolean>;

  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimeStamp: Date,
    jwtIssuedTimeStamp: number,
  ): boolean;
}

export type TUserRole = keyof typeof USER_ROLE;
