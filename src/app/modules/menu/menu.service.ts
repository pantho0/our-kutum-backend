import { IMenu } from './menu.interface';
import { Menu } from './menu.model';

const createMenuIntoDB = async (menuInfo: IMenu) => {
  const result = await Menu.create(menuInfo);
  return result;
};

const getAllMenuFromDB = async (query: Record<string, any>) => {
  const queryObj = { ...query };
  const menuSearchableFields = ['itemName', 'category.catName'];

  let searchTerm = '';
  if (query.searchTerm) {
    searchTerm = query.searchTerm;
  }

  const searchQuery = Menu.find({
    $or: menuSearchableFields.map(field => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  }).populate('category');

  const excludeFields = ['searchTerm', 'category'];
  excludeFields.forEach(field => delete queryObj[field]);
  console.log(queryObj);

  let filterQuery = await searchQuery.find(queryObj);
  if (query.category) {
    filterQuery = filterQuery.filter(
      menu =>
        // @ts-ignore
        menu.category?.catName?.toLowerCase() === query.category.toLowerCase(),
    );
  }

  return filterQuery;
};

export const menuServices = {
  createMenuIntoDB,
  getAllMenuFromDB,
};
