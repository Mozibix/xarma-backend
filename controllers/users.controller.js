import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ErrorResponse from '../utils/errorResponse.js';
import { sendPasswordEmail } from '../utils/email.js';
import UserService from '../services/user.service.js';

/**
 * Request a password change if the user forgets their password
 */
export const forgetPasswordRequest = async (req, res, next) => {
  const { email } = req.params;

  try {
    const user = await UserService.findUserByEmail(email);
    if (!user) return next(new ErrorResponse('User does not exist', 401));

    const secret = process.env.JWT_SECRET + user.password;
    const payload = { email: user.email, id: user._id };
    const token = jwt.sign(payload, secret, { expiresIn: '1h' });
    const link = `${req.protocol}://${req.get('host')}/reset-password/?token=${token}&user=${user._id}`;

    sendPasswordEmail(link, email);
    res.status(200).json({ status: true, message: 'Email sent' });
  } catch (error) {
    next(error);
  }
};

/**
 * Update password after requesting
 */
export const forgetPasswordUpdate = async (req, res, next) => {
  const { new_password, token, user_Id } = req.body;

  try {
    const user = await UserService.findUserById(user_Id);
    if (!user) return next(new ErrorResponse('User doesn\'t exist', 401));

    jwt.verify(token, process.env.JWT_SECRET + user.password, async (err, decodedToken) => {
      if (err) return next(new ErrorResponse('Invalid token', 401));

      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(new_password, salt);
      const updatedUser = await UserService.updateUserPassword(decodedToken.id, hash);

      res.status(200).json({ status: true, data: updatedUser });
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update user password
 */
export const updatePassword = async (req, res, next) => {
  const { old_password, new_password } = req.body;

  try {
    const user = await UserService.findUserById(req.user._id);
    if (!user) return next(new ErrorResponse('No user found', 401));

    const isMatch = await bcrypt.compare(old_password, user.password);
    if (!isMatch) return next(new ErrorResponse('Old password doesn\'t match', 401));

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(new_password, salt);
    const updatedUser = await UserService.updateUserPassword(req.user._id, hashedPassword);

    res.status(200).json({ status: true, data: updatedUser, message: 'Password updated' });
  } catch (error) {
    next(error);
  }
};

/**
 * Get user profile
 */
export const getProfile = async (req, res, next) => {
  try {
    const user = await UserService.findUserById(req.user._id);
    if (!user) return next(new ErrorResponse('User not found', 401));

    res.status(200).json({ status: true, data: user });
  } catch (error) {
    next(error);
  }
};

/**
 * Update user profile
 */
export const updateProfile = async (req, res, next) => {
  const updates = { ...req.body };

  try {
    const updatedUser = await UserService.updateUserProfile(req.user._id, updates);
    res.status(200).json({ status: true, data: updatedUser, message: 'Profile updated' });
  } catch (error) {
    next(error);
  }
};
