import bcrypt from 'bcrypt';

export const hashPassword = (password: string): Promise<string> => {
  const saltRounds = 10; // Número de rondas de sal
  return bcrypt
    .hash(password, saltRounds)
    .then((hashedPassword) => {
      return hashedPassword;
    })
    .catch((error) => {
      console.error('Error hashing password:', error);
      throw error;
    });
};

export const verifyPassword = (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt
    .compare(password, hashedPassword)
    .then((isMatch) => {
      return isMatch;
    })
    .catch((error) => {
      console.error('Error verifying password:', error);
      throw error;
    });
};
