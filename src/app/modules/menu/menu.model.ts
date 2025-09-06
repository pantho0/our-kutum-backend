import { model, Schema } from 'mongoose';
import { IMenu } from './menu.interface';

const menuSchema = new Schema<IMenu>(
  {
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    itemName: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

menuSchema.pre('find', function (next) {
  const opts = this.getOptions?.() || {};
  if (!opts.includeDeleted) {
    this.find({ isDeleted: { $ne: true } });
  }
  next();
});

menuSchema.pre('findOne', function (next) {
  const opts = this.getOptions?.() || {};
  if (!opts.includeDeleted) {
    this.find({ isDeleted: { $ne: true } });
  }
  next();
});

export const Menu = model<IMenu>('Menu', menuSchema);
