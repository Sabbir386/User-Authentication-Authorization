import { z } from 'zod';

const ReviewValidationSchema = z.object({
  courseId: z.string(),
  rating: z.number().int().min(1).max(5),
  review: z.string(),
});

export default ReviewValidationSchema;
