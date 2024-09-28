/* eslint-disable max-len */
/* eslint-disable camelcase */
import Logger from '../middlewares/log.js';
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
      const user = userRepository.findByField('tgId', tgId);
      if (!user) throw new Error('This user does not exist');
      return userObject;
    } catch (error) {
      Logger.logger.error(error.data);
      throw error;
    }
  }
  /**
   * @description Get user card details by userId
   * @param {string} userId 
   * @returns {Object} returns User card details
   */
  static async getUserCardDetails(userId) {
    try {
      const cardDettails = await  userRepository.getUserCardDetails(userId);
      if (!cardDettails) throw new Error('This card details does not exist');
      return cardDettails
    } catch (error) {
      Logger.logger.error(error.data);
      throw error;
    }
  }

  static async create(options) {
    try {
      const user = userRepository.create(options);
      return user;
    } catch (error) {
      logger.error(error.data);
      throw error;
    }
  }
}
