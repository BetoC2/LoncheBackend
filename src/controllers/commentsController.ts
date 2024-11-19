import commentModel from '../models/Comment';
import BaseController from '../utils/BaseController';
import { Comment } from '../models/Comment';
import { Model } from 'mongoose';
import { Request, Response } from 'express';
import HTTP_STATUS_CODES from '../types/http-status-codes';

class CommentsController extends BaseController<Comment> {
  constructor(model: Model<Comment>) {
    super(model);
  }

  update = (req: Request, res: Response) => {
    const { id } = req.params;
    const content = req.body;

    content.id_user = req.user!._id;

    this.model
      .findByIdAndUpdate(id, content, { new: true, runValidators: true })
      .then((item: Comment | null) => {
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

export default new CommentsController(commentModel);
