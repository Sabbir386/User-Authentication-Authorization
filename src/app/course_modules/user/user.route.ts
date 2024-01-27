import express from 'express';

import { UserController } from './user.controller';
import { UserValidation } from './user.validation';
import validateRequest from '../../middleware/validateRequest';
const router = express.Router();

router.post(
  '/auth/register',
  validateRequest(UserValidation.userCreateValidationSchema),
  UserController.createUser,
);

export const UserRoutes = router;
