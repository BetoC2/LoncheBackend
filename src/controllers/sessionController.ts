import { Request, Response } from 'express';
import userModel from '../models/User';
import HTTP_STATUS_CODES from '../types/http-status-codes';
import { verifyPassword, hashPassword } from '../utils/password';
import BaseController from '../utils/BaseController';
import { User } from '../models/User';
import { Model } from 'mongoose';
import { generateToken } from '../utils/jwt';
import { sendEmail } from '../utils/sendEmail';

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

            const token = generateToken(user);
            const { password, ...filteredUser } = user;
            console.log(filteredUser);
            res
              .status(HTTP_STATUS_CODES.OK)
              .json({ token, user: filteredUser });
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
    const { username, email } = userData;

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
        const token = generateToken(newUser);
        const { password, ...filteredUser } = newUser;
        console.log(filteredUser);

        // try {
        //   sendEmail(email, username);
        // } catch (err) {
        //   res.sendStatus(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
        // }

        return res
          .status(HTTP_STATUS_CODES.CREATED)
          .json({ token, user: filteredUser });
      })
      .catch((error) => this.handleError(res, error, 'Error creating user'));
  };
}

export default new sessionController(userModel);
