import { Model, Types } from 'mongoose';

export interface IUser {
  _id?: Types.ObjectId;
  fullName: string;
  email: string;
  password: string;
  userImg: string;
  role: 'admin' | 'user';
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
