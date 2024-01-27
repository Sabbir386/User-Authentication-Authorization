import catchAsync from '../../utilis/catchAsync';
import sendResponse from '../../utilis/sendResponse';
import { UserServices } from './user.service';

import httpStatus from 'http-status';

const createUser = catchAsync(async (req, res) => {
  const user = req.body;
  const result = await UserServices.createUserIntoDb(user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User registered successfully',
    data: result,
  });
});

export const UserController = {
  createUser,
};
