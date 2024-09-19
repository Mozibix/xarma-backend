import ErrorResponse from '../utils/errorResponse.js';
import { findUserByTgId, createUser, generateToken } from '../services/authService.js';

export const CreateAccount = async (req, res, next) => {
  const { tg_id, username } = req.body;

  try {
    const userCheck = await findUserByTgId(tg_id);
    if (userCheck) return next(new ErrorResponse('User already exists', 401));

    const user = await createUser(tg_id, username);
    res.status(200).json({ status: true, data: user });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  const { tg_id } = req.body;

  try {
    const user = await findUserByTgId(tg_id);
    if (!user) return next(new ErrorResponse('This User has no account', 401));

    const token = generateToken(user._id);
    res.status(200).json({ status: true, data: user, token });
  } catch (error) {
    next(error);
  }
};
