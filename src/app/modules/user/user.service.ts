import status from 'http-status';
import AppError from '../../errors/AppError';
import { IUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (userData: IUser) => {
  const isUserExist = await User.isUserExist(userData.email);
  if (isUserExist) {
    throw new AppError(status.BAD_REQUEST, 'User already exists');
  }
  const result = await User.create(userData);
  return result;
};

const getAllUserFromDB = async () => {
  const result = await User.find();
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUserFromDB,
};
