import express from 'express';
import { CategoryController } from './category.controllers';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';
import validateRequest from '../../middleware/validateRequest';
import CategoryValidationSchema from './category.validation';
const router = express.Router();
router.post(
  '/categories',
  auth(USER_ROLE.admin),
  validateRequest(CategoryValidationSchema),
  CategoryController.createCategory,
);
router.get('/categories', CategoryController.getAllCategories);

export const CategoryRoutes = router;
