import { Request, Response } from 'express';
import BaseController from '../utils/BaseController';
import userModel, { User } from '../models/User';

import HTTP_STATUS_CODES from '../types/http-status-codes';
import { hashPassword } from '../utils/password';
import { Model } from 'mongoose';

class UsersController extends BaseController<User> {
  constructor(model: Model<User>) {
    super(model);
  }

  create = (req: Request, res: Response) => {
    const userData = req.body;

    const {
      followers,
      following,
      numFollowers,
      numFollowing,
      joinDate,
      status,
      creationDate,
      ...filteredUserData
    } = userData;

    hashPassword(filteredUserData.password)
      .then((hashedPassword) => {
        filteredUserData.password = hashedPassword;
        return this.model.create(filteredUserData);
      })
      .then((newUser: User) => {
        return res.status(HTTP_STATUS_CODES.CREATED).json(
          newUser.toObject({
            versionKey: false,
            transform: (doc, ret) => {
              delete ret.password; // Eliminar la contraseña del objeto a devolver
              return ret;
            },
          })
        );
      })
      .catch((error) => this.handleError(res, error, 'Error creating user'));
  };

  getAll = (req: Request, res: Response) => {
    this.model
      .find()
      .select('-password') // Excluir el campo password
      .then((results) => {
        return res.status(HTTP_STATUS_CODES.OK).json(results);
      })
      .catch((error) => this.handleError(res, error, 'Error fetching users'));
  };

  getById = (req: Request, res: Response) => {
    const { id } = req.params;
    this.model
      .findById(id)
      .select('-password') // Excluir el campo password
      .then((user) => {
        if (!user) {
          return res
            .status(HTTP_STATUS_CODES.NOT_FOUND)
            .json({ message: 'User not found' });
        }
        return res.status(HTTP_STATUS_CODES.OK).json(user);
      })
      .catch((error) => this.handleError(res, error, 'Error fetching user'));
  };

  update = (req: Request, res: Response) => {
    const { id } = req.params;
    const userData = req.body;

    if (req.file) {
      userData.profilePic = (req.file as Express.MulterS3.File).location;
    }

    this.model
      .findByIdAndUpdate(id, userData, { new: true })
      .select('-password') // Excluir el campo password
      .then((updatedUser) => {
        if (!updatedUser) {
          return res
            .status(HTTP_STATUS_CODES.NOT_FOUND)
            .json({ message: 'User not found' });
        }
        return res.status(HTTP_STATUS_CODES.OK).json(updatedUser);
      })
      .catch((error) => this.handleError(res, error, 'Error updating user'));
  };

  delete = (req: Request, res: Response) => {
    const { id } = req.params;

    this.model
      .findByIdAndDelete(id)
      .select('-password') // Excluir el campo password
      .then((deletedUser) => {
        if (!deletedUser) {
          return res
            .status(HTTP_STATUS_CODES.NOT_FOUND)
            .json({ message: 'User not found' });
        }
        return res.status(HTTP_STATUS_CODES.OK).json(deletedUser);
      })
      .catch((error) => this.handleError(res, error, 'Error deleting user'));
  };
}

export default new UsersController(userModel);
