import { Router } from 'express';
import loginController from '../controllers/loginController';

const loginRoutes = Router();

loginRoutes.post('/', loginController.login);

export default loginRoutes;
