import BaseRepository from "./BaseRepository.js";
import Users from "../../src/models/Users.js";

/**
 * @description BaseRepository
 * @class BaseRepository
 */
class UsersRepository extends BaseRepository {
  /**
   * @description create a new document
   * @param {string} model
   * @returns {document} returns a newly created document
   */
  constructor() {
    super(Users);
  }

  /**
   * @description Get user card details by userId
   * @param {string} userId
   * @returns {Object} returns User card details
   */
  async getUserCardDetails(userId) {
    const lookups = [
      {
        $lookup: {
          from: "Gemascores", // Collection for GemaScores
          localField: "_id",
          foreignField: "userId",
          as: "gemaScoreData",
        },
      },
      {
        $lookup: {
          from: "Tonwallets", // Collection for TonWallets
          localField: "_id",
          foreignField: "userId",
          as: "walletData",
        },
      },
      {
        $lookup: {
          from: "Ranks", // Collection for Ranks
          localField: "_id",
          foreignField: "userId",
          as: "rankData",
        },
      },
    ];

    const projection = {
      _id: 0,
      xHandle: 1,
      "gemaScoreData.gemaScore": {
        $arrayElemAt: ["$gemaScoreData.gemaScore", 0],
      },
      "walletData.walletAddress": {
        $arrayElemAt: ["$walletData.walletAddress", 0],
      },
      "walletData.walletUserName": {
        $arrayElemAt: ["$walletData.walletUserName", 0],
      },
      "rankData.rank": { $arrayElemAt: ["$rankData.rank", 0] },
      "rankData.refillSpeed": { $arrayElemAt: ["$rankData.refillSpeed", 0] },
    };

    return await super.aggregationQueryByUserId(
      "userId",
      userId,
      lookups,
      projection
    );
  }
}

export default UsersRepository;
