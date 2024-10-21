import { Request, Response } from 'express';
import userModel from '../models/User';
import HTTP_STATUS_CODES from '../types/http-status-codes';
import { hashPassword } from '../utils/password';

class UsersController {
  getAll(req: Request, res: Response) {
    userModel
      .find()
      .select('-password')
      .then((results) => {
        return res.status(HTTP_STATUS_CODES.OK).json(results);
      })
      .catch((error) => {
        console.log(error);
        return res
          .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
          .json({ message: 'Internal Server Error' });
      });
  }

  getUserByID(req: Request, res: Response) {
    const { id } = req.params;
    userModel
      .findById(id)
      .select('-password')
      .then((user) => {
        if (!user) {
          return res
            .status(HTTP_STATUS_CODES.NOT_FOUND)
            .json({ message: 'User not found' });
        }
        return res.status(HTTP_STATUS_CODES.OK).json(user);
      })
      .catch((error) => {
        console.log(error);
        return res
          .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
          .json({ message: 'Internal Server Error' });
      });
  }

  createUser(req: Request, res: Response) {
    const userData = req.body;

    // Eliminar atributos no deseados
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
        return userModel.create(filteredUserData);
      })
      .then((newUser) => {
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
      .catch((error) => {
        console.log(error);
        if (error.name === 'ValidationError') {
          return res
            .status(HTTP_STATUS_CODES.BAD_REQUEST)
            .json({ message: 'Validation error', errors: error.errors });
        } else if (error.code === 11000) {
          const duplicatedKey = Object.keys(error.keyValue)[0];
          return res
            .status(HTTP_STATUS_CODES.CONFLICT)
            .json({ message: `${duplicatedKey} field already in use` });
        }
        return res
          .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
          .json({ message: 'Internal Server Error' });
      });
  }

  updateUser(req: Request, res: Response) {
    const { id } = req.params;
    const userData = req.body;

    userModel
      .findByIdAndUpdate(id, userData, { new: true })
      .select('-password')
      .then((updatedUser) => {
        if (!updatedUser) {
          return res
            .status(HTTP_STATUS_CODES.NOT_FOUND)
            .json({ message: 'User not found' });
        }
        return res.status(HTTP_STATUS_CODES.OK).json(updatedUser);
      })
      .catch((error) => {
        console.log(error);
        if (error.name === 'ValidationError') {
          return res
            .status(HTTP_STATUS_CODES.BAD_REQUEST)
            .json({ message: 'Validation error', errors: error.errors });
        }
        return res
          .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
          .json({ message: 'Internal Server Error' });
      });
  }

  deleteUser(req: Request, res: Response) {
    const { id } = req.params;
    userModel
      .findByIdAndDelete(id)
      .select('-password')
      .then((deletedUser) => {
        if (!deletedUser) {
          return res
            .status(HTTP_STATUS_CODES.NOT_FOUND)
            .json({ message: 'User not found' });
        }
        return res.status(HTTP_STATUS_CODES.OK).json(deletedUser);
      })
      .catch((error) => {
        console.log(error);
        return res
          .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
          .json({ message: 'Internal Server Error' });
      });
  }
}

export default new UsersController();
