import { Types } from 'mongoose';
import jwt, { JwtPayload } from 'jsonwebtoken';
import AppError from '../../errors/AppError';
import status from 'http-status';

export const createToken = (
  jwtPayload: {
    userId: Types.ObjectId;
    role: 'admin' | 'user';
    fullName: string;
    email: string;
  },
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn: expiresIn,
  } as jwt.SignOptions);
};

export const verifyToken = (
  token: string,
  secret: string,
): JwtPayload | Error => {
  try {
    return jwt.verify(token, secret) as JwtPayload;
  } catch (error) {
    throw new AppError(
      status.UNAUTHORIZED,
      'You are not authorized to access this resource',
    );
  }
};
