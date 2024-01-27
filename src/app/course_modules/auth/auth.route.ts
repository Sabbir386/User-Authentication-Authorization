import validateRequest from '../../middleware/validateRequest';
import express from 'express';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';
const router = express.Router();

router.post(
  '/auth/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthController.loginUser,
);
router.post(
  '/auth/change-password',
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(AuthValidation.chanePasswordValidationSchema),
  AuthController.changePassword,
);

export const AuthRoutes = router;
