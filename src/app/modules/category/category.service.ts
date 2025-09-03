import { ICategory } from './category.interface';
import { Category } from './category.model';

const createCategoryIntoDB = async (catInfo: ICategory) => {
  const result = await Category.create(catInfo);
  return result;
};

const getAllCategoryFromDB = async () => {
  const result = await Category.find();
  return result;
};

export const CategoryServices = {
  createCategoryIntoDB,
  getAllCategoryFromDB,
};
