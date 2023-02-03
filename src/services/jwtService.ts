import jwt from 'jsonwebtoken';

function generateAccessToken(user: any) {
  return jwt.sign(user, process.env.JWT_SECRET as string, { expiresIn: '30m' });
}

function validateAccessToken(token: string) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET as string);
  } catch (e) {
    return null;
  }
}

export const jwtService = {
  generateAccessToken,
  validateAccessToken,
};
