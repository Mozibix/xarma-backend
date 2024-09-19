import jwt from 'jsonwebtoken';
import ErrorResponse from '../utils/errorResponse.js';
import User from '../models/Users.js';

export const requireAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new ErrorResponse('Unauthorized access', 401));
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return next(new ErrorResponse('Unauthorized access, token required or user not recognized', 401));
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
    if (err) return next(new ErrorResponse('Invalid token', 401));

    const user = await User.findById(decodedToken.id);
    if (!user) return next(new ErrorResponse('Unauthorized access', 401));

    req.user = user;
    next();
  });
};
