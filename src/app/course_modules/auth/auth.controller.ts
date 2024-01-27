import httpStatus from 'http-status';
import catchAsync from '../../utilis/catchAsync';
import sendResponse from '../../utilis/sendResponse';
import { AuthServices } from './auth.services';

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Logged in successfully',
    data: result,
  });
});
const changePassword = catchAsync(async (req, res) => {
  //   console.log(req.user, req.body);
  //   const userId = req.user._id;

  const { ...paswordData } = req.body;
  const result = await AuthServices.changePasswordUser(req.user, paswordData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password changed successfully',
    data: result,
  });
});

export const AuthController = {
  loginUser,
  changePassword,
};
