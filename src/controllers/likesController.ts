import { Request, Response } from 'express';
import Post from '../models/Post';
import HTTP_STATUS_CODES from '../types/http-status-codes';

class LikesController {
  async toggleLikePost(req: Request, res: Response) {
    const { id } = req.params;
    const username = req.user!.username;

    if (!username) {
      res
        .status(HTTP_STATUS_CODES.BAD_REQUEST)
        .json({ message: 'Username is required' });
      return;
    }

    try {
      const post = await Post.findOne({ _id: id, likesUsers: username });

      if (post) {
        await Post.updateOne(
          { _id: id },
          {
            $pull: { likesUsers: username },
            $inc: { likes: -1 },
          }
        );
        res.status(HTTP_STATUS_CODES.OK).json({ message: 'Like removed' });
        return;
      }
      await Post.updateOne(
        { _id: id },
        {
          $addToSet: { likesUsers: username },
          $inc: { likes: 1 },
        }
      );
      res.status(HTTP_STATUS_CODES.OK).json({ message: 'Like added' });
    } catch (error) {
      console.error('Error toggling like:', error);
      res
        .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal server error' });
    }
  }
}

const likesController = new LikesController();
export default likesController;
