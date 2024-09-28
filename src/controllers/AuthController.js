import { verifyTelegramRequest } from "../utils/telegram.js";
import UserService from '../services/userService.js';
import { generateRandomAlphaNumeric, createToken } from "../utils/createTokens.js"
import gemaService from "../services/gemaService.js";
import xeetService from "../services/xeetService.js";
import { randomUUID } from "crypto";

class AuthController {
     /**
     * @description login a telegram account
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
                    'status': false,
                    'error': "Could not validate telegram details"
                });
            }
            const telegramUser = JSON.parse(queryParams.user);
            let user = await UserService.getAUser(telegramUser.id);
            if (!user) {
                const userData = {
                    userId: randomUUID(),
                    tgId: telegramUser.id,
                    tgUsername: telegramUser.username,
                    username: telegramUser.first_name,
                    inviteCode: generateRandomAlphaNumeric(10)
                };
                const user = await UserService.create(userData);
                await gemaService.create(user._id);
                await xeetService.create(user._id)
            }
            const token = createToken(user._id);
            return res.status(200).json({
                message: 'User authenticated successfully.',
                user,
                token
            });
        } catch (error) {
            logger.error(error.data);
            return res.status(500).json({
                'status': false,
                'error': "A server error occured. Please try again later"
            });
        }
    }
}


export default AuthController;