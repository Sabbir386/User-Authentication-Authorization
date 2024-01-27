import express from 'express';
import { ReviewController } from './review.controllers';
import { USER_ROLE } from '../user/user.constant';
import auth from '../../middleware/auth';
import validateRequest from '../../middleware/validateRequest';
import ReviewValidationSchema from './review.validation';
const router = express.Router();
router.post(
  '/reviews',
  auth(USER_ROLE.user),
  validateRequest(ReviewValidationSchema),
  ReviewController.createReview,
);

export const ReviewRoutes = router;
