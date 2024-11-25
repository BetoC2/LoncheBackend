import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import MyUser from '../types/User';

declare global {
  namespace Express {
    interface Request {
      myUser?: MyUser;
    }
  }
}

export const auth = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers['auth'] as string;

  if (!token) {
    res.status(401).json({ message: 'Unauthorized: Token missing' });
    return;
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as MyUser;
    req.myUser = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};
