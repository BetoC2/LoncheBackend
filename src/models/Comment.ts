import mongoose, { Document, Schema } from 'mongoose';

interface Comment extends Document {
  // id_post: Schema.Types.ObjectId;
  // id_user: Schema.Types.ObjectId;
  content: string;
  likes: number;
  dislikes: number;
  creationDate?: Date;
}

const CommentSchema = new Schema({
  // id_post: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Post',
  //   required: true,
  // },
  // id_user: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'User',
  //   required: true,
  // },
  content: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  dislikes: {
    type: Number,
    default: 0,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
});

const commentModel = mongoose.model<Comment>('Comment', CommentSchema);
export default commentModel;
