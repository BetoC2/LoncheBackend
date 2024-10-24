import { Router } from 'express';
import sessionController from '../controllers/sessionController';

const sessionRoutes = Router();

sessionRoutes.post('/login', sessionController.login);
sessionRoutes.post('/register', sessionController.create);

export default sessionRoutes;
