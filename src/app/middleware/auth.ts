import { NextFunction, Request, Response } from 'express';

import httpStatus from 'http-status';
import AppError from '../errors/AppError';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import catchAsync from '../utilis/catchAsync';
import { TUserRole } from '../course_modules/user/user.interface';

const auth = (...required_Rules: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized Access', '');
    }

    jwt.verify(
      token,
      config.jwt_access_secret as string,
      function (err, decoded) {
        if (err) {
          throw new AppError(
            httpStatus.UNAUTHORIZED,
            'Unauthorized Access',
            '',
          );
        }
        const role = (decoded as JwtPayload).role;
        if (required_Rules && !required_Rules.includes(role)) {
          throw new AppError(
            httpStatus.UNAUTHORIZED,
            'Unauthorized Access',
            '',
          );
        }

        req.user = decoded as JwtPayload;

        next();
      },
    );
  });
};

export default auth;
