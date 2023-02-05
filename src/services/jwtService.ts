import jwt from 'jsonwebtoken';

function generateAccessToken(user: any) {
  return jwt.sign(user, process.env.JWT_SECRET as string, { expiresIn: '15m' });
}

function generateRefreshToken(user: any) {
  return jwt
    .sign(user, process.env.JWT_REFRESH_SECRET as string,
      { expiresIn: '15 days' });
}

function validateAccessToken(token: string) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET as string);
  } catch (e) {
    return null;
  }
}

function validateRefreshToken(token: string) {
  try {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET as string);
  } catch (e) {
    return null;
  }
}

export const jwtService = {
  generateAccessToken,
  generateRefreshToken,
  validateAccessToken,
  validateRefreshToken,
};
