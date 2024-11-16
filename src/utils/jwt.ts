import jwt from 'jsonwebtoken';
import User from '../types/User';

export const generateToken = (user: User) => {
  return jwt.sign(
    {
      _id: user._id,
      id_city: user.id_city,
      username: user.email,
      email: user.role,
      name: user.name,
      lastname: user.lastname,
      birthdate: user.birthdate,
      numFollowers: user.numFollowers,
      numFollowing: user.numFollowing,
    },
    process.env.JWT_SECRET as string,
    { expiresIn: '2h' }
  );
};
