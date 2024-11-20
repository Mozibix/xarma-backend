/**
 * @description Referral controllers
 */
import Logger from "../middlewares/log.js";
import gemaService from "../services/gemaService.js";
import mineService from "../services/mineService.js";
import UserService from "../services/userService.js";
import xeetService from "../services/xeetService.js";
import makeRequest from "../utils/makeRequest.js";
import handleMiningScenario from "../utils/mining.js";

class MineController {
  static async MineUrl(req, res) {
    try {
      const { url, god_extractor } = req.body;
      const user = req.user;
      if (!url || !user.xHandle || !user.tonWalletDetails) {
        return res
          .status(400)
          .json({ status: false, message: "Required fields missing" });
      }

      const { impressions, likes, handle } = await mineService.UrlApiCall(url);
      const checkOwner = await UserService.getAUser("xHandle", handle);
      const checkIfUrlMinedAlready = await mineService.checkIfUrlMined(url);

      // Handle different mining scenarios
      const result = await handleMiningScenario(
        user,
        checkOwner,
        checkIfUrlMinedAlready,
        impressions,
        likes,
        god_extractor,
        url
      );
      res.status(200).json({ status: true, data: result });
    } catch (error) {
      Logger.logger.error(error.message);
      res.status(500).json({ status: false, message: "Server error occurred" });
    }
  }

  static async MineHistory(req, res) {
    try {
      const value = await mineService.getAllMinedUrls(req.user._id);
      res.status(200).json({ status: true, data: value });
    } catch (error) {
      Logger.logger.error(error.data);
      return res.status(500).json({
        status: false,
        error: "A server error occured. Please try again later",
      });
    }
  }

  static async Particular(req, res) {
    try {
      const value = await mineService.getParticularMined(req.params.id);
      res.status(200).json({ status: true, data: value });
    } catch (error) {
      Logger.logger.error(error.data);
      return res.status(500).json({
        status: false,
        error: "A server error occured. Please try again later",
      });
    }
  }
}

export default MineController;
