import { Request, Response, NextFunction } from 'express';
import HTTP_STATUS_CODES from '../types/http-status-codes';

export const adminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;

  if (!user) {
    res
      .status(HTTP_STATUS_CODES.UNAUTHORIZED)
      .json({ message: 'Unauthorized' });
    return;
  }

  if (user.role === 'admin') {
    next();
  } else {
    res.status(HTTP_STATUS_CODES.FORBIDDEN).json({ message: 'Forbidden' });
  }
};

export const moderatorMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;

  if (!user) {
    res
      .status(HTTP_STATUS_CODES.UNAUTHORIZED)
      .json({ message: 'Unauthorized' });
    return;
  }

  if (user.role === 'mod') {
    next();
  } else {
    res.status(HTTP_STATUS_CODES.FORBIDDEN).json({ message: 'Forbidden' });
  }
};

export const selfOrAdminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  const { id } = req.params;

  if (!user) {
    res
      .status(HTTP_STATUS_CODES.UNAUTHORIZED)
      .json({ message: 'Unauthorized' });
    return;
  }

  if (user.role === 'admin' || (user._id as string) === id) {
    next();
  } else {
    res.status(HTTP_STATUS_CODES.FORBIDDEN).json({ message: 'Forbidden' });
  }
};

export const selfOrModeratorMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  const { id } = req.params;

  if (!user) {
    res
      .status(HTTP_STATUS_CODES.UNAUTHORIZED)
      .json({ message: 'Unauthorized' });
    return;
  }

  if (user.role === 'mod' || (user._id as string) === id) {
    next();
  } else {
    res.status(HTTP_STATUS_CODES.FORBIDDEN).json({ message: 'Forbidden' });
  }
};
