import { Request, Response, NextFunction } from 'express';
import HTTP_STATUS_CODES from '../types/http-status-codes';
import ROLES from '../types/roles';

const permissionsMiddleware = (allowedRoles: ROLES[], allowSelf: boolean) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    const { id } = req.params;

    if (!user) {
      res
        .status(HTTP_STATUS_CODES.UNAUTHORIZED)
        .json({ message: 'Unauthorized' });
      return;
    }

    if (
      allowedRoles.includes(user.role!) ||
      (allowSelf && (user._id as string) === id)
    ) {
      next();
    } else {
      res.status(HTTP_STATUS_CODES.FORBIDDEN).json({ message: 'Forbidden' });
    }
  };
};

export default permissionsMiddleware;
