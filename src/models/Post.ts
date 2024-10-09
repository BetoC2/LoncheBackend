import mongoose, { Document, Schema } from 'mongoose';
import CATEGORIES from '../types/categories';

interface Post extends Document {
  // id_city: Schema.Types.ObjectId;
  // id_user: Schema.Types.ObjectId;
  title: string;
  content: string;
  category: CATEGORIES;
  creationDate?: Date;
  likes: number;
  dislikes: number;
  numComments: number;
  mediaURL?: string;
}

const PostSchema = new Schema({
  // id_city: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'City',
  //   required: true,
  // },
  // id_user: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'User',
  //   required: true,
  // },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: Object.values(CATEGORIES),
    required: true,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: Number,
    default: 0,
  },
  dislikes: {
    type: Number,
    default: 0,
  },
  numComments: {
    type: Number,
    default: 0,
  },
  mediaURL: {
    type: String,
  },
});

const postModel = mongoose.model<Post>('Post', PostSchema);
export default postModel;
