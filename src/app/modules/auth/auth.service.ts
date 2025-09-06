import status from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLogin } from './auth.interface';
import { createToken } from './auth.utils';
import config from '../../config';
import { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { sendEmail } from '../../utils/sendEmail';

const loginUser = async (payload: TLogin) => {
  const user = await User.isUserExist(payload.email);
  if (!user) {
    throw new AppError(status.NOT_FOUND, 'User not found');
  }

  if (!(await User.isPasswordMatched(payload.password, user.password))) {
    throw new AppError(status.UNAUTHORIZED, 'Password is incorrect');
  }

  const jwtPayload = {
    userId: user._id,
    fullName: user.fullName,
    role: user.role,
    email: user.email,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret!,
    config.jwt_acces_exp!,
  );
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret!,
    config.jwt_refresh_exp!,
  );

  return {
    accessToken,
    refreshToken,
  };
};

const changePasswordIntoDB = async (
  userInfo: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  const user = await User.isUserExist(userInfo.email);
  if (!user) throw new AppError(status.NOT_FOUND, 'User not found');
  if (user?.isDeleted)
    throw new AppError(status.UNAUTHORIZED, 'User is deleted');
  if (!(await User.isPasswordMatched(payload.oldPassword, user.password)))
    throw new AppError(status.UNAUTHORIZED, 'Password is incorrect');
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.salt_round),
  );
  const result = await User.findOneAndUpdate(
    { email: userInfo.email, role: userInfo.role },
    { password: newHashedPassword, passwordChagedAt: new Date() },
    { new: true },
  );
  return result;
};

const forgetPasswordGenerator = async (payload: { email: string }) => {
  const user = await User.isUserExist(payload.email);
  if (!user) throw new AppError(status.NOT_FOUND, 'User not found');
  if (user?.isDeleted)
    throw new AppError(status.UNAUTHORIZED, 'User is deleted');

  const jwtPayload = {
    userId: user._id,
    fullName: user.fullName,
    role: user.role,
    email: user.email,
  };

  const resetToken = createToken(jwtPayload, config.jwt_access_secret!, '10m');

  const resetLink = `${config.reset_ui_link}/reset-password?email=${user?.email}&token=${resetToken}`;

  await sendEmail(user.email, resetLink);
  return null;
};

export const AuthServices = {
  loginUser,
  changePasswordIntoDB,
  forgetPasswordGenerator,
};
