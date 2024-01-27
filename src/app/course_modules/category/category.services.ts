import { JwtPayload } from 'jsonwebtoken';
import { TCategory } from './category.interface';
import { Category } from './category.model';

const createCategoryIntoDb = async (
  userdata: JwtPayload,
  categoryData: TCategory,
) => {
  categoryData.createdBy = userdata._id.toString();
  const result = await Category.create(categoryData);
  return result;
};
const getCategoryFromDb = async () => {
  const result = await Category.find().populate('createdBy');
  return result;
};
export const CategoryServices = {
  createCategoryIntoDb,
  getCategoryFromDb,
};
