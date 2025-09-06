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

const changeUserRoleIntoDB = async (payload: { id: string; role: string }) => {
  const user = await User.findByIdAndUpdate(
    payload.id,
    {
      $set: {
        role: payload.role,
      },
    },
    { new: true },
  );

  return user;
};

const deleteUserIntoDB = async (payload: { id: string }) => {
  const user = await User.findByIdAndUpdate(
    payload.id,
    [
      {
        $set: {
          isDeleted: { $not: '$isDeleted' },
        },
      },
    ],
    { new: true },
  );

  return user;
};

export const UserServices = {
  createUserIntoDB,
  getAllUserFromDB,
  changeUserRoleIntoDB,
  deleteUserIntoDB,
};
