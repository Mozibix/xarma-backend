import PensionAccountRepository from "../repositories/PensionRepository.js";
import UserRepository from "../repositories/UserRepository.js";
import GemaRepository from "../repositories/GemaRepository.js";
import Logger from "../middlewares/log.js";

const pensionAccountRepository = new PensionAccountRepository();
const userRepository = new UserRepository();
const gemaRepository = new GemaRepository();

export default class PensionService {
  /**
   * @description Toggle Pension Fund Contribution (On/Off)
   * @param {string} userId
   * @param {boolean} isActive
   */
  static async togglePensionFund(userId, isActive) {
    try {
      // Update user status (assuming user model has a pension toggle field)
      const user = await userRepository.update(userId, { isPensionActive: isActive });
      if (!user) throw new Error("User not found");

      return { success: true, message: `Pension fund is now ${isActive ? 'activated' : 'deactivated'}` };
    } catch (error) {
      Logger.logger.error(error);
      throw error;
    }
  }

  /**
   * @description Deduct 1 Gema and add to Pension Account if activated
   */
  static async autoPensionContribution() {
    try {
      // Fetch all users who have pension activated
      const usersWithPension = await userRepository.findByFieldAll('isPensionActive', true);

      for (const user of usersWithPension) {
        const { userId } = user;

        // Fetch the user's Gema balance from the GemaScores collection
        const gemaScore = await gemaRepository.findByField('userId', userId);

        if (!gemaScore || gemaScore.gemaScore < 1) {
          Logger.logger.warn(`User ${userId} does not have enough Gema to contribute.`);
          continue;
        }

        // Deduct 1 Gema from the user's Gema balance
        await gemaRepository.increment(userId, 'gemaScore', -1);

        // Add 1 Gema to the user's Pension Account
        await pensionAccountRepository.incrementPensionContribution(userId);

        Logger.logger.info(`1 Gema deducted from user ${userId} and added to their Pension Account.`);
      }
    } catch (error) {
      Logger.logger.error("Error in auto pension contribution:", error);
      throw error;
    }
  }
}


