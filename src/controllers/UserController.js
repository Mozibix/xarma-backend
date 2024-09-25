import UserService from '../services/userService.js';

/**
 * @description UserController
 */
class UserController {
  /**
     * @description get a user
     * @param  {object} req
     * @param {object} res
     * @returns {object} a json object
     * @memberof UserController
     */
  static async getUser(req, res) {
    try {
      const userDetails = req.authData; // depends on what it is called in the client
      const option = {
        tgId: userDetails.sub,
      };
      const user = await UserService.getAUser(option);
      return res.status(200).json({
        message: 'Successfully retrieved',
        data: user
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        errorCode: 121,
        data: error.message,
      });
    }
  }
}

export default UserController