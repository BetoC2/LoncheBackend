import { Router } from 'express';
import likesController from '../controllers/likesController';
import { auth } from '../middlewares';

const likesRoutes = Router();

likesRoutes.post('/:id', auth, likesController.toggleLikePost);

export default likesRoutes;
