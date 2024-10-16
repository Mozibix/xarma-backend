import RankRepository from "../repositories/RankRepository";

const rankRepository = new RankRepository();
/**
 * @description helper
 * @class helper
 */
export default class  {
    static async getRankColor(user_id) {
      try {
        // const {
        //   tgId
        // } = option;
        const rankColor = await rankRepository.findByField('userId', user_id);
        if (!rankColor) throw new Error('This data does not exist');
        return rankColor;
      } catch (error) {
        logger.error(error.data);
        throw error;
      }
  }

    static async create(user_id) {
      try {
        rankRepository.create({
          userId: user_id
        });
      } catch (error) {
        logger.error(error.data)
        throw error;
      }
    }
  }