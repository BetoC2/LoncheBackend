import { Request, Response } from 'express';
import cityModel from '../models/City';
import HTTP_STATUS_CODES from '../types/http-status-codes';

class CitiesController {
    create(req: Request, res: Response) {
        const content = req.body;

        cityModel
            .create(content)
            .then((city) => {
                return res.status(HTTP_STATUS_CODES.CREATED).json(city);
            })
            .catch((error) => {
                console.log(error);
                return res
                    .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
                    .json({ message: 'Error creating city' });
            });
    }

    getCities(req: Request, res: Response) {
        cityModel
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

    getCityByID(req: Request, res: Response) {
        const { id } = req.params;

        cityModel
            .findById(id)
            .then((city) => {
                if (!city) {
                    return res
                        .status(HTTP_STATUS_CODES.NOT_FOUND)
                        .json({ message: 'City not found' });
                }

                return res.status(HTTP_STATUS_CODES.OK).json(city);
            })
            .catch((error) => {
                console.log(error);
                return res
                    .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
                    .json({ message: 'Error getting city' });
            });
    }

    updateCity(req: Request, res: Response) {
        const { id } = req.params;
        const content = req.body;
    
        cityModel
          .findByIdAndUpdate(id,  content , { new: true, runValidators: true })
          .then((city) => {
            if (!city) {
              return res
                .status(HTTP_STATUS_CODES.NOT_FOUND)
                .json({ message: 'City not found' });
            }
    
            return res.status(HTTP_STATUS_CODES.OK).json(city);
          })
          .catch((error) => {
            console.log(error);
            return res
              .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
              .json({ message: 'Error updating city' });
          });
      }

      deleteCity(req: Request, res: Response) {
        const { id } = req.params;
    
        cityModel
          .findByIdAndDelete(id)
          .then((city) => {
            if (!city) {
              return res
                .status(HTTP_STATUS_CODES.NOT_FOUND)
                .json({ message: 'City not found' });
            }
    
            return res.status(HTTP_STATUS_CODES.OK).json(city);
          })
          .catch((error) => {
            console.log(error);
            return res
              .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
              .json({ message: 'Error deleting city' });
          });
      }



}

export default new CitiesController();