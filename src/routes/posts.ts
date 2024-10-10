import { Router } from 'express';
import postsController from '../controllers/postsController';

const postsRoutes = Router();

postsRoutes.post('/', postsController.create);
postsRoutes.get('/', postsController.getPosts);
postsRoutes.get('/:id', postsController.getPostByID);
postsRoutes.put('/:id', postsController.updatePost);
postsRoutes.delete('/:id', postsController.deletePost);

export default postsRoutes;