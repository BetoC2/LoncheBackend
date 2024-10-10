import { Router } from 'express';
import citiesController from '../controllers/citiesController';

const commentsRoutes = Router();

commentsRoutes.post('/', citiesController.create);
commentsRoutes.get('/', citiesController.getCities);
commentsRoutes.get('/:id', citiesController.getCityByID);
commentsRoutes.put('/:id', citiesController.updateCity);
commentsRoutes.delete('/:id', citiesController.deleteCity);

export default commentsRoutes;