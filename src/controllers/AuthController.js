import { verifyTelegramRequest } from "../utils/telegram.js";
import UserService from "../services/userService.js";
import {
  generateRandomAlphaNumeric,
  createToken,
} from "../utils/createTokens.js";
import gemaService from "../services/gemaService.js";
import xeetService from "../services/xeetService.js";
import { randomUUID } from "crypto";
import referralService from "../services/referralService.js";
import Logger from "../middlewares/log.js";
// import { log } from "console";

class AuthController {
  /**
   * @description login and signup of a user using their telegram account
   * @param  {object} req
   * @param {object} res
   * @returns {object} a json object
   * @memberof AuthController
   */
  static async authenticateUser(req, res) {
    try {
      const queryParams = req.query;
      const verify = await verifyTelegramRequest(queryParams);
      if (!verify) {
        return res.status(403).json({
          status: false,
          error: "Could not validate telegram details",
        });
      }

      const telegramUser = JSON.parse(queryParams.user);
      //Check for required parameters
      const requiredFields = ["id", "username", "first_name"];

      for (const field of requiredFields) {
        if (!Object.keys(telegramUser).includes(field)) {
          return res.status(403).json({
            status: false,
            error: `${field} data is required`,
          });
        }
      }

      let user = await UserService.getAUser(telegramUser.id);

      if (!user) {
        const userData = {
          userId: randomUUID(),
          tgId: telegramUser.id,
          tgUsername: telegramUser.username,
          username: telegramUser.first_name,
          inviteCode: generateRandomAlphaNumeric(10),
        };
        user = await UserService.create(userData);
        await gemaService.create(user._id);
        await xeetService.create(user._id);

        //check if invite code was sent in query
        if (telegramUser.inviteCode) {
          //since no user was found, find the inviter by the inviteCode
          let inviter = await UserService.findInviter(telegramUser.inviteCode);

          if (inviter) {
            //if inviter is found, reward the inviter
            await gemaService.rewardGema(inviter._id, 1);
            //update the referalSystem
            await referralService.create(
              user._id,
              telegramUser.inviteCode,
              inviter._id
            );
          }
        }
      }
      const token = createToken(user._id);
      return res.status(200).json({
        message: "User authenticated successfully.",
        user,
        token,
      });
    } catch (error) {
      Logger.logger.error(error.data);
      console.log(error);
      return res.status(500).json({
        status: false,
        error: "A server error occured. Please try again later",
      });
    }
  }
}

export default AuthController;
