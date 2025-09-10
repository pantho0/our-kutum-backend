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

const getSingleMenuFromDB = async (id: string) => {
  const result = await Menu.findById(id).populate('category');
  return result;
};

const updateMenuIntoDB = async (id: string, menuInfo: IMenu) => {
  const result = await Menu.findByIdAndUpdate(id, menuInfo, {
    new: true,
  });
  return result;
};

const deleteMenuIntoDB = async (payload: { id: string }) => {
  const menu = await Menu.findByIdAndUpdate(
    payload.id,
    [
      {
        $set: {
          isDeleted: { $not: '$isDeleted' },
        },
      },
    ],
    { new: true },
  );

  return menu;
};

const getDeletedMenusFromDB = async (query: Record<string, any>) => {
  const menuSearchableFields = ['itemName', 'category.catName'];

  const baseQuery = Menu.find({ isDeleted: true })
    .setOptions({ includeDeleted: true })
    .populate('category');

  const builder = new QueryBuilder(baseQuery, query)
    .search(menuSearchableFields)
    .filter()
    .sort()
    .fields();

  const result = await builder.getPaginatedData();
  return result;
};

export const menuServices = {
  createMenuIntoDB,
  getAllMenuFromDB,
  updateMenuIntoDB,
  deleteMenuIntoDB,
  getDeletedMenusFromDB,
  getSingleMenuFromDB,
};
