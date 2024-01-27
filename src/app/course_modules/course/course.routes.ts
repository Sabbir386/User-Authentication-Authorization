import express from 'express';
import { CourseControllers } from './course.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';
import validateRequest from '../../middleware/validateRequest';
import CourseValidationSchema from './course.validation';
const router = express.Router();
router.post(
  '/courses',
  auth(USER_ROLE.admin),
  validateRequest(CourseValidationSchema),
  CourseControllers.createCourse,
);
router.get('/courses', CourseControllers.getCoursesFromDb);
router.put(
  '/courses/:courseId',
  auth(USER_ROLE.admin),
  CourseControllers.updatedCourseById,
);
router.get(
  '/courses/:courseId/reviews',
  CourseControllers.getCoursesandReviewsById,
);
router.get('/course/best', CourseControllers.getBestCourseOnAverageReview);
export const CourseRoutes = router;
