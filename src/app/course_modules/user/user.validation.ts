import { z } from 'zod'

const userCreateValidationSchema = z.object({
  username: z.string({
    required_error: 'username is Required',
  }),
  email: z.string({
    required_error: 'email is Required',
  }),
  password: z
    .string({
      required_error: 'Password must be String',
    }) 
    .min(8, { message: 'Password can not be less then 8 character' }),
  role: z.enum(['admin' , 'user']).default('user'),
})

export const UserValidation = {
  userCreateValidationSchema,
}
