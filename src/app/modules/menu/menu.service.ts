import { IMenu } from './menu.interface';
import { Menu } from './menu.model';

const createMenuIntoDB = async (menuInfo: IMenu) => {
  const result = await Menu.create(menuInfo);
  return result;
};

const getAllMenuFromDB = async () => {
  const result = await Menu.find().populate('category');
  return result;
};

export const menuServices = {
  createMenuIntoDB,
  getAllMenuFromDB,
};
