import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;
  private postFilters: ((docs: T[]) => T[])[] = [];

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const searchTerm = this.query.searchTerm as string;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          field =>
            ({
              [field]: { $regex: searchTerm, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }
    return this;
  }

  filter() {
    const queryObj = { ...this.query };
    const excludeFields = [
      'minPrice',
      'maxPrice',
      'searchTerm',
      'sortBy',
      'sortOrder',
      'page',
      'limit',
      'fields',
      'category',
    ];
    excludeFields.forEach(el => delete queryObj[el]);

    const conditions: Record<string, unknown> = { ...queryObj };
    this.modelQuery = this.modelQuery.find(conditions);

    if (this.query.category) {
      const categories = (this.query.category as string)
        .split(',')
        .map((c: string) => c.trim().toLowerCase());
      this.postFilters.push(docs =>
        docs.filter(doc =>
          // @ts-ignore
          categories.includes(doc.category?.catName?.toLowerCase()),
        ),
      );
    }
    return this;
  }

  sort() {
    const sortBy = (this.query.sortBy as string) || 'createdAt';
    const sortOrder = this.query.sortOrder === 'asc' ? 1 : -1;
    this.modelQuery = this.modelQuery.sort({ [sortBy]: sortOrder });
    return this;
  }

  paginate() {
    const page = Number(this.query.page) || 1;
    const limit = Number(this.query.limit) || 10;
    const skip = (page - 1) * limit;
    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }

  fields() {
    const fields = (this.query.fields as string)?.split(',')?.join(' ');
    if (fields) {
      const includeCategory = fields.split(' ').includes('category');
      if (includeCategory) {
        this.modelQuery = this.modelQuery.populate({
          path: 'category',
          select: 'catName', // populate only needed fields
        });
        const topFields = fields
          .split(' ')
          .filter(f => f !== 'category')
          .join(' ');
        if (topFields) this.modelQuery = this.modelQuery.select(topFields);
      } else {
        this.modelQuery = this.modelQuery.select(fields).populate('category');
      }
    } else {
      this.modelQuery = this.modelQuery.populate('category'); // default populate
    }
    return this;
  }

  async exec() {
    let results = await this.modelQuery.exec();
    this.postFilters.forEach(fn => {
      results = fn(results);
    });

    // Handle total count and pagination meta
    const page = Number(this.query.page) || 1;
    const limit = Number(this.query.limit) || 10;
    const total = results.length;
    const totalPages = Math.ceil(total / limit);

    // Apply manual pagination for post-filtered results
    const skip = (page - 1) * limit;
    const paginatedData = results.slice(skip, skip + limit);

    return {
      page,
      limit,
      total,
      totalPages,
      data: paginatedData,
    };
  }
}

export default QueryBuilder;
