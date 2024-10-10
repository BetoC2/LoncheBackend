import { Request, Response } from "express";
import userModel from "../models/User";
import HTTP_STATUS_CODES from '../types/http-status-codes';

class UsersController {

    getAll(req: Request, res: Response) {
        userModel.find()
            .then(results => {
                return res.status(HTTP_STATUS_CODES.OK).json(results);
            })
            .catch(error => {
                console.log(error);
                return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Error retrieving users' });
            });
    }

    getUserByID(req: Request, res: Response) {
        const { id } = req.params;
        userModel.findById(id)
            .then(user => {
                if (!user) {
                    return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ message: 'User not found' });
                }
                return res.status(HTTP_STATUS_CODES.OK).json(user);
            })
            .catch(error => {
                console.log(error);
                return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Error retrieving user' });
            });
    }

    createUser(req: Request, res: Response) {
        const userData = req.body;
        userModel.create(userData)
            .then(newUser => {
                return res.status(HTTP_STATUS_CODES.CREATED).json(newUser);
            })
            .catch(error => {
                console.log(error);
                return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Error creating user' });
            });
    }

    updateUser(req: Request, res: Response) {
        const { id } = req.params;
        const userData = req.body;
        userModel.findByIdAndUpdate(id, userData, { new: true })
            .then(updatedUser => {
                if (!updatedUser) {
                    return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ message: 'User not found' });
                }
                return res.status(HTTP_STATUS_CODES.OK).json(updatedUser);
            })
            .catch(error => {
                console.log(error);
                return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Error updating user' });
            });
    }

    deleteUser(req: Request, res: Response) {
        const { id } = req.params;
        userModel.findByIdAndDelete(id)
            .then(deletedUser => {
                if (!deletedUser) {
                    return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ message: 'User not found' });
                }
                return res.status(HTTP_STATUS_CODES.OK).json(deletedUser);
            })
            .catch(error => {
                console.log(error);
                return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Error deleting user' });
            });
    }
}

export default new UsersController();