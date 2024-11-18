import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../types/User';

declare global {
  namespace Express {
    interface Request {
      user?: User;
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
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as User;
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};
