import { z } from 'zod';

const CourseValidationSchema = z.object({
  title: z
    .string({
      required_error: 'Title is Required',
    })
    .min(1, { message: 'Title must not be empty' }),
  instructor: z
    .string({
      required_error: 'Instructor is Required',
    })
    .min(1, { message: 'Instructor name must not be empty' }),
  categoryId: z
    .string({
      required_error: 'CategoryId is Required',
    })
    .min(1, { message: 'Category ID must not be empty' }),
  price: z
    .number({
      required_error: 'Price is Required',
    })
    .min(0.01, { message: 'Price must be greater than 0' }),
  tags: z.array(
    z.object({
      name: z.string().min(1, { message: 'Tag name must not be empty' }),
      isDeleted: z.boolean(),
    }),
  ),
  startDate: z.string({
    required_error: 'startDate is Required',
  }),
  endDate: z.string({
    required_error: 'endDate is Required',
  }),
  language: z
    .string({
      required_error: 'Language is Required',
    })
    .min(1, { message: 'Language must not be empty' }),
  provider: z
    .string({
      required_error: 'Provider is Required',
    })
    .min(1, { message: 'Provider must not be empty' }),
  durationInWeeks: z.number().int().optional(),
  details: z.object({
    level: z.enum(['Beginner', 'Intermediate', 'Advanced']),
    description: z
      .string()
      .min(1, { message: 'Description must not be empty' }),
  }),
});

export default CourseValidationSchema;
