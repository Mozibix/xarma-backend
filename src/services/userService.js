/* eslint-disable max-len */
/* eslint-disable camelcase */
import UserRepository from '../repositories/UserRepository.js';

const userRepository = new UserRepository();

/**
 * @description UserService
 * @class UserService
 */
export default class UserService {
  /**
     * @description method for getting all users
     * @param {option} option
     * @returns {document} returns a user document
     */
  static async getAUser(option) {
    try {
      const {
        tgId
      } = option;
      const user = await userRepository.findByField('tgId', tgId);
      if (!user) throw new Error('This user does not exist');
      return userObject;
    } catch (error) {
      logger.error(error.data);
      throw error;
    }
  }
}
