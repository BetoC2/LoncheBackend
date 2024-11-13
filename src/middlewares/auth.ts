//import cookieParser from 'cookie-parser';
import { Request, Response, NextFunction } from 'express';
import User from '../types/User';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const signedUser = req.signedCookies.user;
  console.log('Signed cookie:', signedUser);

  if (signedUser) {
    req.user = JSON.parse(signedUser);
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};
