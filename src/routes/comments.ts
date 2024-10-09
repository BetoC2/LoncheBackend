import { Router } from 'express';
import commentsController from '../controllers/commentsController';

const commentsRoutes = Router();

commentsRoutes.post('/', commentsController.create);
commentsRoutes.get('/', commentsController.getComments);
commentsRoutes.get('/:id', commentsController.getCommentByID);
commentsRoutes.put('/:id', commentsController.updateComment);
commentsRoutes.delete('/:id', commentsController.deleteComment);

export default commentsRoutes;
