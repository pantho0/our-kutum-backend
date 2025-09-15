/* eslint-disable @typescript-eslint/ban-ts-comment */
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

    // Post-filter for category
    if (this.query.category) {
      const categories = (this.query.category as string)
        .split(',')
        .map(c => c.trim().toLowerCase());
      this.postFilters.push(docs =>
        docs.filter(doc =>
          // @ts-expect-error
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

  fields() {
    const fields = (this.query.fields as string)?.split(',')?.join(' ');
    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }

  // Execute query with post-filters and internal pagination
  async getPaginatedData() {
    let results = await this.modelQuery.exec();

    // Apply post-filters (like category)
    this.postFilters.forEach(fn => {
      results = fn(results);
    });

    const page = Number(this.query.page) || 1;
    const limit = Number(this.query.limit) || 10;
    const total = results.length;
    const totalPages = Math.ceil(total / limit);

    const skip = (page - 1) * limit;
    const paginatedData = results.slice(skip, skip + limit);

    return {
      meta: {
        page,
        limit,
        total,
        totalPages,
      },
      data: paginatedData,
    };
  }
}

export default QueryBuilder;
