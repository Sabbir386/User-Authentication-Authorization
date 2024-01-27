import { Request, Response } from 'express';

import httpStatus from 'http-status';
import sendResponse from '../../utilis/sendResponse';
import { ReviewServices } from './review.services';
import catchAsync from '../../utilis/catchAsync';

const createReview = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const review = req.body;
  // const zodParsedData = ReviewValidationSchema.parse(review);
  const result = await ReviewServices.createReviewIntoDb(user, review);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Review created successfully',
    data: result,
  });
});

export const ReviewController = {
  createReview,
};
