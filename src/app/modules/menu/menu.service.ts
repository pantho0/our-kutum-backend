import QueryBuilder from '../../builder/QueryBuilder';
import { IMenu } from './menu.interface';
import { Menu } from './menu.model';

const createMenuIntoDB = async (menuInfo: IMenu) => {
  const result = await Menu.create(menuInfo);
  return result;
};

const getAllMenuFromDB = async (query: Record<string, any>) => {
  const menuSearchableFields = ['itemName', 'category.catName'];

  const builder = new QueryBuilder(Menu.find().populate('category'), query)
    .search(menuSearchableFields)
    .filter()
    .sort()
    .fields();

  const result = await builder.getPaginatedData();

  return result;
};

const updateMenuIntoDB = async (id: string, menuInfo: IMenu) => {
  const result = await Menu.findByIdAndUpdate(id, menuInfo, {
    new: true,
  });
  return result;
};

export const menuServices = {
  createMenuIntoDB,
  getAllMenuFromDB,
  updateMenuIntoDB,
};
