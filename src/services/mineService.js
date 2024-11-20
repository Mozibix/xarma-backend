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
   */
  static async UrlApiCall(url) {
    const xtweetIdMatch = url.match(/status\/(\d+)/);
    const tweetId = xtweetIdMatch ? xtweetIdMatch[1] : null;
    if (!tweetId) throw new Error("Invalid tweet URL");

    const endpoint = `https://api.x.com/2/tweets/${tweetId}`;
    const queryParams = new URLSearchParams({
      "tweet.fields": "public_metrics,created_at,organic_metrics",
      expansions: "author_id",
      "user.fields": "username",
    }).toString();

    const headers = {
      Host: "api.x.com",
      "User-Agent": "My Twitter App v1.0.23",
      Authorization: `Bearer ${process.env.TWITTER_BEARER}`,
    };

    const response = await makeRequest(
      `${endpoint}?${queryParams}`,
      {},
      headers,
      "GET"
    );
    if (!response) throw new Error("Error fetching data from Twitter API");

    return {
      impressions: response.public_metrics.impression_count,
      likes: response.public_metrics.like_count,
      handle: response.author_id,
    };
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
