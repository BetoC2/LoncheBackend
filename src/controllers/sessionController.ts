import { Request, Response } from 'express';
import userModel from '../models/User';
import HTTP_STATUS_CODES from '../types/http-status-codes';
import { verifyPassword, hashPassword } from '../utils/password';
import BaseController from '../utils/BaseController';
import { User } from '../models/User';
import { Model } from 'mongoose';

class sessionController extends BaseController<User> {
  constructor(model: Model<User>) {
    super(model);
  }

  login = (req: Request, res: Response) => {
    const { email, password } = req.body;

    this.model
      .findOne({ email })
      .then((user) => {
        if (!user) {
          return res
            .status(HTTP_STATUS_CODES.NOT_FOUND)
            .json({ message: 'Invalid username or password' });
        }
        verifyPassword(password, user.password as string)
          .then((isPasswordCorrect) => {
            if (!isPasswordCorrect) {
              return res
                .status(HTTP_STATUS_CODES.NOT_FOUND)
                .json({ message: 'Invalid username or password' });
            }

            res
              .cookie('user', JSON.stringify(user), { signed: true })
              .status(HTTP_STATUS_CODES.OK)
              .json({ message: 'Login successful' });
          })
          .catch((error) => {
            console.log(error);
            return res
              .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
              .json({ message: 'Internal Server Error' });
          });
      })
      .catch((error) => {
        console.log(error);
        return res
          .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
          .json({ message: 'Internal Server Error' });
      });
  };

  register = (req: Request, res: Response) => {
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
        return userModel.create(filteredUserData);
      })
      .then((newUser: User) => {
        return res
          .cookie('user', JSON.stringify(newUser), { signed: true })
          .status(HTTP_STATUS_CODES.CREATED)
          .json(
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
}

export default new sessionController(userModel);
