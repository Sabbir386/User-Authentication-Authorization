import { z } from 'zod';

const loginValidationSchema = z.object({
  username: z.string({
    required_error: 'username is Required',
  }),
  password: z
    .string({
      required_error: 'Password is Required',
    })
    .min(8, { message: 'Password can not be less then 8 character' }),
});
const chanePasswordValidationSchema = z.object({
  oldPassword: z.string({
    required_error: 'Old Password is Required',
  }),

  newPassword: z.string({
    required_error: 'Old Password is Required',
  }),
});

export const AuthValidation = {
  loginValidationSchema,
  chanePasswordValidationSchema,
};
