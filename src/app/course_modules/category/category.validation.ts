import { z } from 'zod';

const CategoryValidationSchema = z.object({
  name: z.string(),
});

export default CategoryValidationSchema;
