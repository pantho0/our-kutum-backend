import { Types } from 'mongoose';

export interface IMenu {
  category: Types.ObjectId;
  itemName: string;
  price: number;
  description: string;
  isDeleted: boolean;
  image: string;
}
