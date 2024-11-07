import ReferralRepository from "../repositories/ReferralRepository.js";
import UrlbankRepository from "../repositories/UrlbankRepository.js";

const urlbankRepository = new UrlbankRepository();
/**
 * @description helper
 * @class referralService
 */
export default class {
  /**
   *
   * @param {*} particular_id
   * @returns
   */
  static async getParticularMined(particular_id) {
    try {
      const particular = await urlbankRepository.findById(particular_id);
      return particular;
    } catch (error) {
      throw error;
    }
  }

  /**
   *
   * @param {*} user_id
   * @returns
   */
  static async getAllMinedUrls(user_id) {
    try {
      const totalMined = await urlbankRepository.findByFieldAll(user_id);
      return totalMined;
    } catch (error) {
      throw error;
    }
  }

  /**
   *
   * @param {*} url
   * @returns object
   */
  static async checkIfUrlMined(url) {
    try {
      const alreadyMined = await urlbankRepository.findByField("url", url);
      return alreadyMined;
    } catch (error) {
      throw error;
    }
  }

  /**
   *
   * @param {*} urlBank_id
   * @param {*} options
   */
  static async updateOgAfterSnipping(urlBank_id, options) {
    try {
      const add = await urlbankRepository.update(urlBank_id, options);
      return add;
    } catch (error) {
      throw error;
    }
  }

  /**
   *
   * @param {string} url
   * @param {boolean} god_extractor
   */
  static async mine(url, god_extractor) {
    try {
      //check if the url was sent to this body
      if (!url) {
        throw new Error("The url is needed");
      }
      //check if user has submitted their twitter link
      if (!req.user.xHandle) {
        throw new Error("User need to submit their X handle to proceed");
      }

      //check for connected ton wallet
      if (!req.user.tonWalletDetails) {
        throw new Error("User need to submit their X handle to proceed");
      }

      //check if they have mined for today

      //Api Call to twitter
      const xtweetIdMaytch = url.match(/status\/(\d+)/);
      const tweetId = xtweetIdMaytch ? xtweetIdMaytch[1] : null;

      if (!tweetId) {
        return res
          .status(400)
          .json({ status: false, message: "Invalid tweet URL" });
      }

      //call api and return certain info
      const endpoint = `https://api.x.com/2/tweets/${tweetId}`;
      const reqParams = {
        "tweet.fields": "public_metrics,created_at,organic_metrics",
        expansions: "author_id",
        "user.fields": "username",
      };
      const queryParams = new URLSearchParams(reqParams).toString();
      const headers = {
        Host: "api.x.com",
        "User-Agent": "My Twitter App v1.0.23",
        Authorization: `Bearer ${process.env.TWITTER_BEARER}`,
      };
      const checkUrl = await makeRequest(
        `${endpoint}${queryParams}`,
        {},
        headers,
        "GET"
      );
    } catch (error) {
      Logger.logger.error(error.data);
      throw error;
    }
  }

  /**
   *
   * @param {*} user_id
   * @param {*} gemaScorePerUrl
   * @param {*} xeetScorePerUrl
   * @param {*} numberOfImpression
   * @param {*} numberOfLikes
   * @param {*} isValidLink
   * @param {*} url
   * @param {*} extractorType
   */
  static async create(
    og,
    snipper,
    gemaScorePerUrl,
    xeetScorePerUrl,
    numberOfImpression,
    numberOfLikes,
    isValidLink,
    url,
    extractorType
  ) {
    try {
      // Create the object with required fields
      const newUrlbankData = {
        gemaScorePerUrl,
        xeetScorePerUrl,
        numberOfImpression,
        numberOfLikes,
        isValidLink,
        url,
        extractorType,
      };

      console.log(og, snipper);

      // Include `og` if it is provided
      if (og != undefined) {
        newUrlbankData.og = og;
      }

      // Include `snipper` if it is provided
      if (snipper != undefined) {
        newUrlbankData.snipper = snipper;
      }

      // Create the new URL bank document
      const newUrlbank = await urlbankRepository.create(newUrlbankData);
      return newUrlbank;
    } catch (error) {
      throw error;
    }
  }
}
