import { Router } from 'express';
import categoriesController from '../controllers/categoriesController';

const categoriesRoutes = Router();

categoriesRoutes.get('/name/:name', categoriesController.getByName);
categoriesRoutes.post('/', categoriesController.create);
categoriesRoutes.get('/', categoriesController.getAll);
categoriesRoutes.get('/:id', categoriesController.getById);
categoriesRoutes.put('/:id', categoriesController.update);
categoriesRoutes.delete('/:id', categoriesController.delete);

export default categoriesRoutes;
