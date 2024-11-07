/**
 * @description Referral controllers
 */
import Logger from "../middlewares/log.js";
import gemaService from "../services/gemaService.js";
import mineService from "../services/mineService.js";
import UserService from "../services/userService.js";
import xeetService from "../services/xeetService.js";
import makeRequest from "../utils/makeRequest.js";

class MineController {
  static async MineUrl(req, res) {
    try {
      const { url, god_extractor } = req.body;
      //check if the url was sent to this body
      if (!url) {
        return res.status(401).json({
          status: false,
          message: "The url is needed",
        });
      }
      //check if user has submitted their twitter link
      if (!req.user.xHandle) {
        return res.status(401).json({
          status: false,
          message: "User need to submit their X handle to proceed",
        });
      }

      //check for connected ton wallet
      if (!req.user.tonWalletDetails) {
        return res.status(401).json({
          status: false,
          message: "User need to submit their ton Wallet to proceed",
        });
      }

      const xtweetIdMaytch = url.match(/status\/(\d+)/);
      const tweetId = xtweetIdMaytch ? xtweetIdMaytch[1] : null;

      if (!tweetId) {
        return res
          .status(400)
          .json({ status: false, message: "Invalid tweet URL" });
      }

      //call api and return certain info
      // const endpoint = `https://api.x.com/2/tweets/${tweetId}`;
      // const reqParams = {
      //   "tweet.fields": "public_metrics,created_at,organic_metrics",
      //   expansions: "author_id",
      //   "user.fields": "username",
      // };
      // const queryParams = new URLSearchParams(reqParams).toString();
      // const headers = {
      //   Host: "api.x.com",
      //   "User-Agent": "My Twitter App v1.0.23",
      //   Authorization: `Bearer ${process.env.TWITTER_BEARER}`,
      // };
      // const checkUrl = await makeRequest(
      //   `${endpoint}${queryParams}`,
      //   {},
      //   headers,
      //   "GET"
      // );
      // //Check if the api call was successfull
      // if (!checkUrl) {
      //   return res.status(401).json({
      //     status: false,
      //     message: "Invalid mine url",
      //   });
      // }
      /** I mocked the api call */

      //calculate the reward
      let Xeetreward = 20; //checkUrl.impressions / 1000000;
      let GemaReward = 10; //checkUrl.likes / 100000;

      //check if the extrated link owner is on our database and if they match this person trying to mine it
      // const checkOwner = await userService.getAUser("xHandle", checkUrl.handle); //real one
      const checkOwner = await UserService.getAUser(
        "xHandle",
        "tester2xhandle"
      ); //mock

      //check if url link has been mined
      const checkIfUrlMinedAlready = await mineService.checkIfUrlMined(url);
      console.log(checkIfUrlMinedAlready, "checking if its aleady mined");

      /** Here means the url has not been mined now */

      if (!checkIfUrlMinedAlready) {
        // check if its an OG looking to mine

        if (checkOwner._id.toString() === req.user._id.toString()) {
          //now here means its an OG looking to mine, handle the reward
          Xeetreward = god_extractor ? Xeetreward * 10 : Xeetreward * 5;
          GemaReward = god_extractor ? Xeetreward * 10 : GemaReward * 5;

          //(check if God extractor is enabled)

          //we create a new mined document here
          const minedDocument = await mineService.create(
            req.user._id, //og
            undefined, //snipper
            GemaReward, //gemaScorePerUrl
            Xeetreward, //xeetScorePerUrl
            1000, //checkUrl.impression, numberOfImpression
            500, //checkUrl.numberOfLikes, numberOfLikes
            true, //isValidLink
            url, //url
            "og" //extractorType
          );

          //reward og xeet model
          await xeetService.rewardXeet(req.user._id, Xeetreward);
          //reward og gema model
          await gemaService.rewardGema(req.user._id, GemaReward);
          return res.status(200).json({ status: true, data: minedDocument });
        }
        //meaning that it was a snipper who came to mine
        Xeetreward = god_extractor ? Xeetreward * 10 : Xeetreward * 4;
        GemaReward = god_extractor ? GemaReward * 10 : GemaReward * 4;

        //we create a new mined document here
        const minedDocument = await mineService.create(
          undefined, //og
          req.user._id, //snipper
          GemaReward, //gemaScorePerUrl
          Xeetreward, //xeetScorePerUrl
          1000, //checkUrl.impression, //numberOfImpression
          100, //checkUrl.numberOfLikes, //numberOfLikes
          true, //isValidLink
          url, //url
          "sniper" //extractorType
        );

        //reward og xeet model
        await xeetService.rewardXeet(req.user._id, Xeetreward);
        //reward og gema model
        await gemaService.rewardGema(req.user._id, GemaReward);
        return res.status(200).json({ status: true, data: minedDocument });
      }

      /** If it has already been mined */
      //If Og has already mined this post handled
      if (checkIfUrlMinedAlready.og) {
        return res.status(401).json({
          status: false,
          message: "This post has already been mined by og",
        });
      }
      //now if its been mined, and its a sniper who minned initially
      if (checkIfUrlMinedAlready.snipper && checkOwner._id !== req.user._id) {
        return res.status(401).json({
          status: false,
          message: "This post has already been snipped",
        });
      }

      //now its og looking to mine give them their 4x since its alreaady been snipped
      Xeetreward = god_extractor ? Xeetreward * 10 : Xeetreward * 4;
      GemaReward = god_extractor ? GemaReward * 10 : GemaReward * 4;
      console.log("This one finally ran here");

      //we are appending to already created document of the urlBank
      const updated = await mineService.updateOgAfterSnipping(
        checkIfUrlMinedAlready._id,
        {
          og: req.user._id,
          xeetScorePerUrl: Xeetreward + checkIfUrlMinedAlready.xeetScorePerUrl,
          gemaScorePerUrl: GemaReward + checkIfUrlMinedAlready.gemaScorePerUrl,
        }
      );
      //reward og xeet model
      await xeetService.rewardXeet(req.user._id, Xeetreward);
      //reward og gema model
      await gemaService.rewardGema(req.user._id, GemaReward);
      return res.status(200).json({ status: true, data: updated });
    } catch (error) {
      Logger.logger.error(error.data);
      console.log(error);
      return res.status(500).json({
        status: false,
        error: "A server error occured. Please try again later",
      });
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
