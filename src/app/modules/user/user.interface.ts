import { Model } from 'mongoose';

export interface IUser {
  fullName: string;
  email: string;
  password: string;
  userImg: string;
  isDeleted: boolean;
}

export interface UserModel extends Model<IUser> {
  isUserExist(email: string): Promise<IUser | null>;
  isPasswordMatched(
    givenPlainTextPassword: string,
    savedHashedPassword: string,
  ): Promise<boolean>;
}
