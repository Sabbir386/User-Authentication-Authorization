import httpStatus from 'http-status';

import { TLoginUser } from './auth.interface';
import AppError from '../../errors/AppError';

import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import { User } from '../user/user.model';
import bcrypt from 'bcrypt';

const loginUser = async (payload: TLoginUser) => {
  const user = await User.isUserExistsByUserName(payload?.username);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found', '');
  }

  if (!(await User.isPasswordMatched(payload.password, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password Do not match', '');
  }
  //   console.log(user);
  const jwtPayLoad = {
    _id: user?._id,
    username: user.username,
    role: user.role,
    email: user.email,
  };

  const accessToken = jwt.sign(jwtPayLoad, config.jwt_access_secret as string, {
    expiresIn: '10d',
  });

  return { user: jwtPayLoad, token: accessToken };
};
const changePasswordUser = async (
  userdata: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  const user = await User.isUserExistsByUserName(userdata?.username);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found', '');
  }

  if (!(await User.isPasswordMatched(payload.oldPassword, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password Do not match', '');
  }
  const newHashPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_saltround),
  );

  const result = await User.findOneAndUpdate(
    {
      username: userdata.username,
      role: userdata.role,
    },
    {
      password: newHashPassword,
      passwordChangeAt: new Date(),
    },
  );
  return result;
};

export const AuthServices = {
  loginUser,
  changePasswordUser,
};
