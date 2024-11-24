import mongoose, { Document, Schema } from 'mongoose';
import CATEGORIES from '../types/categories';

export interface Category extends Document {
  name: CATEGORIES;
  color: string;
}

const CategorySchema = new Schema({
  name: {
    type: String,
    enum: {
      values: Object.values(CATEGORIES),
      message: '{VALUE} is not a valid category',
    },
    required: [true, 'Category is required'],
  },
  color: {
    type: String,
    required: [true, 'Color is required'],
  },
});

const categoryModel = mongoose.model<Category>('Category', CategorySchema);
export default categoryModel;
