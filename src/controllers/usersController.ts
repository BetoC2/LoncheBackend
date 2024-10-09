import { Request, Response } from "express";
import userModel from "../models/User";
import HTTP_STATUS_CODES from '../types/http-status-codes';

class UsersController {

    async getAll(req: Request, res: Response) {
        try {
            const results = await userModel.find();
            return res.status(HTTP_STATUS_CODES.OK).json(results);
        } catch (error) {
            return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Error retrieving users' });
        }
    }

    async getUserByID(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const user = await userModel.findById(id);
            if (!user) {
                return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ message: 'User not found' });
            }
            return res.status(HTTP_STATUS_CODES.OK).json(user);
        } catch (error) {
            console.log(error);
            return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Error retrieving user' });
        }
    }

    async createUser(req: Request, res: Response) {
        const userData = req.body;
        try {
            const newUser = await userModel.create(userData);
            return res.status(HTTP_STATUS_CODES.CREATED).json(newUser);
        } catch (error) {
            console.log(error);
            return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Error creating user' });
        }
    }

    async updateUser(req: Request, res: Response) {
        const { id } = req.params;
        const userData = req.body;
        try {
            const updatedUser = await userModel.findByIdAndUpdate(id, userData, { new: true });
            if (!updatedUser) {
                return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ message: 'User not found' });
            }
            return res.status(HTTP_STATUS_CODES.OK).json(updatedUser);
        } catch (error) {
            console.log(error);
            return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Error updating user' });
        }
    }

    async deleteUser(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const deletedUser = await userModel.findByIdAndDelete(id);
            if (!deletedUser) {
                return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ message: 'User not found' });
            }
            return res.status(HTTP_STATUS_CODES.OK).json(deletedUser);
        } catch (error) {
            console.log(error);
            return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Error deleting user' });
        }
    }

}

export default new UsersController();