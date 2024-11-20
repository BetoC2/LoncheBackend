import { Request, Response } from 'express';
import postModel from '../models/Post';
import BaseController from '../utils/BaseController';
import { Post } from '../models/Post';
import { Model } from 'mongoose';
import HTTP_STATUS_CODES from '../types/http-status-codes';

class PostsController extends BaseController<Post> {
  constructor(model: Model<Post>) {
    super(model);
  }

  create = (req: Request, res: Response) => {
    const content = req.body;
    content.id_user = req.user!._id;
    content.username = req.user!.username;

    if (req.file) {
      content.mediaURL = (req.file as Express.MulterS3.File).location;
    }
    this.model
      .create(content)
      .then((item: Post) => res.status(HTTP_STATUS_CODES.CREATED).json(item))
      .catch((error: any) =>
        this.handleError(res, error, 'Error creating item')
      );
  };

  getAll = (req: Request, res: Response) => {
    const exclude = req.query.exclude === 'true';

    const query = exclude ? { id_user: { $ne: req.user!._id } } : {}; // Sin exclusiones

    this.model
      .find(query)
      .sort({ creationDate: -1 })
      .then((items: Post[]) => res.status(HTTP_STATUS_CODES.OK).json(items))
      .catch((error: any) =>
        this.handleError(res, error, 'Error fetching items')
      );
  };

  update = (req: Request, res: Response) => {
    const { id } = req.params;
    const content = req.body;

    if (req.file) {
      content.mediaURL = (req.file as Express.MulterS3.File).location;
    }

    this.model
      .findByIdAndUpdate(id, content, { new: true, runValidators: true })
      .then((item: Post | null) => {
        if (!item) {
          return res
            .status(HTTP_STATUS_CODES.NOT_FOUND)
            .json({ message: 'Item not found' });
        }
        return res.status(HTTP_STATUS_CODES.OK).json(item);
      })
      .catch((error: any) =>
        this.handleError(res, error, 'Error updating item')
      );
  };
}

export default new PostsController(postModel);
