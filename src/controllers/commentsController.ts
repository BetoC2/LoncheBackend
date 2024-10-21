import { Request, Response } from 'express';
import commentModel from '../models/Comment';
import HTTP_STATUS_CODES from '../types/http-status-codes';

class CommentsController {
  create(req: Request, res: Response) {
    const content = req.body;

    commentModel
      .create(content)
      .then((comment) => {
        return res.status(HTTP_STATUS_CODES.CREATED).json(comment);
      })
      .catch((error) => {
        console.log(error);
        if (error.name === 'ValidationError') {
          return res
            .status(HTTP_STATUS_CODES.BAD_REQUEST)
            .json({ message: 'Validation error', errors: error.errors });
        }
        return res
          .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
          .json({ message: 'Error creating comment' });
      });
  }

  getComments(req: Request, res: Response) {
    commentModel
      .find()
      .then((comments) => {
        return res.status(HTTP_STATUS_CODES.OK).json(comments);
      })
      .catch((error) => {
        console.log(error);
        return res
          .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
          .json({ message: 'Error getting comments' });
      });
  }

  getCommentByID(req: Request, res: Response) {
    const { id } = req.params;

    commentModel
      .findById(id)
      .then((comment) => {
        if (!comment) {
          return res
            .status(HTTP_STATUS_CODES.NOT_FOUND)
            .json({ message: 'Comment not found' });
        }

        return res.status(HTTP_STATUS_CODES.OK).json(comment);
      })
      .catch((error) => {
        console.log(error);
        return res
          .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
          .json({ message: 'Error getting comment' });
      });
  }

  updateComment(req: Request, res: Response) {
    const { id } = req.params;
    const content = req.body;

    commentModel
      .findByIdAndUpdate(id, content, { new: true, runValidators: true })
      .then((comment) => {
        if (!comment) {
          return res
            .status(HTTP_STATUS_CODES.NOT_FOUND)
            .json({ message: 'Comment not found' });
        }

        return res.status(HTTP_STATUS_CODES.OK).json(comment);
      })
      .catch((error) => {
        console.log(error);
        if (error.name === 'ValidationError') {
          return res
            .status(HTTP_STATUS_CODES.BAD_REQUEST)
            .json({ message: 'Validation error', errors: error.errors });
        } else if (error.code === 11000) {
          const duplicatedKey = Object.keys(error.keyValue)[0];
          return res
            .status(HTTP_STATUS_CODES.CONFLICT)
            .json({ message: `${duplicatedKey} field already in use` });
        }
        return res
          .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
          .json({ message: 'Error updating comment' });
      });
  }

  deleteComment(req: Request, res: Response) {
    const { id } = req.params;

    commentModel
      .findByIdAndDelete(id)
      .then((comment) => {
        if (!comment) {
          return res
            .status(HTTP_STATUS_CODES.NOT_FOUND)
            .json({ message: 'Comment not found' });
        }

        return res.status(HTTP_STATUS_CODES.OK).json(comment);
      })
      .catch((error) => {
        console.log(error);
        return res
          .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
          .json({ message: 'Error deleting comment' });
      });
  }
}

export default new CommentsController();
