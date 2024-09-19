import User from '../models/Users.js';
import { createToken } from '../utils/createTokens.js';

export const findUserByTgId = async (tg_id) => {
  return await User.findOne({ tg_id });
};

export const createUser = async (tg_id, username) => {
  const user = new User({ tg_id, username });
  await user.save();
  return user;
};

export const generateToken = (userId) => {
  return createToken(userId);
};
