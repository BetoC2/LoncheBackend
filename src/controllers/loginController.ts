import { Request, Response } from 'express';
import userModel from '../models/User';
import HTTP_STATUS_CODES from '../types/http-status-codes';
import { verifyPassword } from '../utils/password';

class loginController {
  login(req: Request, res: Response) {
    const { email, password } = req.body;

    userModel
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
  }
}

export default new loginController();
