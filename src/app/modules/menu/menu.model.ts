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
  },
  {
    timestamps: true,
  },
);

export const Menu = model<IMenu>('Menu', menuSchema);
