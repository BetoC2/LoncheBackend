import { Router } from 'express';
import usersController from '../controllers/usersController';

const usersRoutes = Router();

usersRoutes.post('/', usersController.createUser);
usersRoutes.get('/', usersController.getAll);
usersRoutes.get('/:id', usersController.getUserByID);
usersRoutes.put('/:id', usersController.updateUser);
usersRoutes.delete('/:id', usersController.deleteUser);

export default usersRoutes;
