import { Request, Response } from 'express';
import postModel from '../models/Post';
import HTTP_STATUS_CODES from '../types/http-status-codes';


class PostsController {
    create(req: Request, res: Response) {
        const content = req.body;

        postModel
            .create(content)
            .then((post) => {
                return res.status(HTTP_STATUS_CODES.CREATED).json(post);
            })
            .catch((error) => {
                console.log(error);
                return res
                    .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
                    .json({ message: 'Error creating post' });
            });
    }

    getPosts(req: Request, res: Response) {
        postModel
            .find()
            .then((cities) => {
                return res.status(HTTP_STATUS_CODES.OK).json(cities);
            })
            .catch((error) => {
                console.log(error);
                return res
                    .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
                    .json({ message: 'Error getting cities' });
            });
    }

    getPostByID(req: Request, res: Response) {
        const { id } = req.params;

        postModel
            .findById(id)
            .then((post) => {
                if (!post) {
                    return res
                        .status(HTTP_STATUS_CODES.NOT_FOUND)
                        .json({ message: 'Post not found' });
                }

                return res.status(HTTP_STATUS_CODES.OK).json(post);
            })
            .catch((error) => {
                console.log(error);
                return res
                    .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
                    .json({ message: 'Error getting post' });
            });
    }

    updatePost(req: Request, res: Response) {
        const { id } = req.params;
        const content = req.body;
    
        postModel
          .findByIdAndUpdate(id,  content , { new: true, runValidators: true })
          .then((post) => {
            if (!post) {
              return res
                .status(HTTP_STATUS_CODES.NOT_FOUND)
                .json({ message: 'Post not found' });
            }
    
            return res.status(HTTP_STATUS_CODES.OK).json(post);
          })
          .catch((error) => {
            console.log(error);
            return res
              .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
              .json({ message: 'Error updating post' });
          });
      }

      deletePost(req: Request, res: Response) {
        const { id } = req.params;
    
        postModel
          .findByIdAndDelete(id)
          .then((post) => {
            if (!post) {
              return res
                .status(HTTP_STATUS_CODES.NOT_FOUND)
                .json({ message: 'Post not found' });
            }
    
            return res.status(HTTP_STATUS_CODES.OK).json(post);
          })
          .catch((error) => {
            console.log(error);
            return res
              .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
              .json({ message: 'Error deleting post' });
          });
      }



}

export default new PostsController();