import postModel from '../models/Post';
import BaseController from '../utils/BaseController';
import { Post } from '../models/Post';
import { Model } from 'mongoose';

class PostsController extends BaseController<Post> {
  constructor(model: Model<Post>) {
    super(model);
  }
}

export default new PostsController(postModel);
