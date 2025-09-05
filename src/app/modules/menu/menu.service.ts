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

  //pagination
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;

  //field limiting
  let fields: string | null = '-__v';
  if (query.fields) {
    fields = query.fields.split(',').join(' ');
  }

  const searchQuery = Menu.find({
    $or: menuSearchableFields.map(field => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  }).populate('category');

  if (fields) {
    searchQuery.select(fields);
  }

  const excludeFields = [
    'searchTerm',
    'category',
    'sortBy',
    'sortOrder',
    'page',
    'limit',
    'fields',
  ];
  excludeFields.forEach(field => delete queryObj[field]);

  let filterQuery = await searchQuery.find(queryObj);
  if (query.category) {
    if (query.category) {
      const categories = query.category
        .split(',')
        .map((c: string) => c.trim().toLowerCase());
      filterQuery = filterQuery.filter(menu =>
        // @ts-ignore
        categories.includes(menu.category?.catName?.toLowerCase()),
      );
    }
  }

  // ✅ Sorting
  if (query.sortBy) {
    const sortOrder = query.sortOrder === 'desc' ? -1 : 1;
    filterQuery = filterQuery.sort((a: any, b: any) => {
      if (a[query.sortBy] < b[query.sortBy]) return -1 * sortOrder;
      if (a[query.sortBy] > b[query.sortBy]) return 1 * sortOrder;
      return 0;
    });
  }

  // ✅ Pagination (apply after filter + sort)
  const total = filterQuery.length;
  const paginatedData = filterQuery.slice(skip, skip + limit);

  return {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
    data: paginatedData,
  };
};

export const menuServices = {
  createMenuIntoDB,
  getAllMenuFromDB,
};
