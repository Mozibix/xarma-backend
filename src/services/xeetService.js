import XeetRepository from "../repositories/xeetRepository.js";

const xeetRepository = new XeetRepository();
/**
 * @description helper
 * @class helper
 */
export default class {
  static async getXeetScore(user_id) {
    try {
      // const {
      //   tgId
      // } = option;
      const xeetScore = await xeetRepository.findByField("userId", user_id);
      if (!xeetScore) throw new Error("This data does not exist");
      return xeetScore;
    } catch (error) {
      logger.error(error.data);
      throw error;
    }
  }

  static async create(user_id) {
    try {
      xeetRepository.create({
        userId: user_id,
      });
    } catch (error) {
      logger.error(error.data);
      throw error;
    }
  }

  /**
   * @description Fetch all xeets by a specific user
   * @param {string} userId - User ID to fetch xeets for
   * @returns {Array<Document>} Array of xeets
   */
  static async fetchAllXeetsByUser(userId) {
    try {
      const xeets = await xeetRepository.fetchAllXeetsByUser(userId);
      if (!xeets) throw new Error("No xeets found for this user");
      return xeets;
    } catch (error) {
      logger.error(error.message);
      throw error;
    }
  }

  /**
   * @description Mint impressions into xeetScore for a user
   * @param {string} userId - User ID for minting
   * @param {number} amountToMint - Number of impressions to convert into xeetScore
   * @returns {Document} Updated document with new xeetScore and impression count
   */
  static async mintXeetScore(userId, amountToMint) {
    try {
      const updatedXeet = await xeetRepository.mintXeetScore(
        userId,
        amountToMint
      );
      return updatedXeet;
    } catch (error) {
      logger.error(error.message);
      throw error;
    }
  }
}
