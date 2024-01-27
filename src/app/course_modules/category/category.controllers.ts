import { NextFunction, Request, Response } from 'express';

import httpStatus from 'http-status';
import sendResponse from '../../utilis/sendResponse';
import { CategoryServices } from './category.services';
import catchAsync from '../../utilis/catchAsync';

const createCategory = catchAsync(async (req: Request, res: Response) => {
  const category = req.body;
  const user = req.user;
  const result = await CategoryServices.createCategoryIntoDb(user, category);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Category created successfully',
    data: result,
  });
});

const getAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await CategoryServices.getCategoryFromDb();
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Categories retrieved successfully',
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const CategoryController = {
  createCategory,
  getAllCategories,
};
