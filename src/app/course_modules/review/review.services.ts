import { JwtPayload } from 'jsonwebtoken';
import { TReview } from './review.interface';
import { Review } from './review.model';

const createReviewIntoDb = async (
  userdata: JwtPayload,
  reviewData: TReview,
) => {
  reviewData.createdBy = userdata._id.toString();
  const review = await Review.create(reviewData);

  const result = await Review.findById(review._id).populate('createdBy');

  return result;
};
export const ReviewServices = {
  createReviewIntoDb,
};
