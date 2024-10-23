import commentModel from '../models/Comment';
import BaseController from '../utils/BaseController';
import { Comment } from '../models/Comment';
import { Model } from 'mongoose';

class CommentsController extends BaseController<Comment> {
  constructor(model: Model<Comment>) {
    super(model);
  }
}

export default new CommentsController(commentModel);
