import mongoose, { Document, Schema } from 'mongoose';

interface Comment extends Document {
  id_post: Schema.Types.ObjectId;
  id_user: Schema.Types.ObjectId;
  content: string;
  likes: number;
  dislikes: number;
  creationDate?: Date;
}

const CommentSchema = new Schema({
  id_post: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: [true, 'Post ID is required'],
  },
  id_user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required'],
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    minlength: [5, 'Content must be at least 5 characters long'],
  },
  likes: {
    type: Number,
    default: 0,
    min: [0, 'Likes cannot be negative'],
  },
  dislikes: {
    type: Number,
    default: 0,
    min: [0, 'Dislikes cannot be negative'],
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
});

const commentModel = mongoose.model<Comment>('Comment', CommentSchema);
export default commentModel;
