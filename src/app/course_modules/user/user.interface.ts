import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export type TUserType = 'admin' | 'user';

export type TUser = {
  _id: any;
  username: string;
  email: string;
  password: string;
  passwordChangeAt?: Date;
  role: TUserType;
};
export interface UserModel extends Model<TUser> {
  // myStaticMethod(): number
  isUserExistsByUserName(username: string): Promise<TUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}
export type TUserRole = keyof typeof USER_ROLE;
