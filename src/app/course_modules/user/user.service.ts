import { TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDb = async (payload: TUser) => {
  const result = await User.create(payload);
  const { password, ...newUserWithoutPassordField } = result.toObject();
  return newUserWithoutPassordField;
};

export const UserServices = {
  createUserIntoDb,
};
