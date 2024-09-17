require("dotenv").config();
const ErrorResponse = require("../utils/errorResponse.js");
const User = require("../models/Users");
const { createToken } = require("../utils/createTokens");

/**
 * @Swagger
 * /auth/signup:
 *   post:
 *     summary: user signup
 *     tags: [Auth]
 *     requestBody:
 *      required: true
 *      content:
 *       application/json:
 *        schema:
 *         type: object
 *         required:
 *          - tg_id
 *          - username
 *         properties:
 *           tg_id:
 *             type: string
 *             description: unique id to gotten from windows object from tg
 *           username:
 *             type: string
 *             description: the user preferred username
 *     responses:
 *       200:
 *         description: Successful signup
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: successful
 *       400:
 *         description: Bad request - Invalid input data
 *       401:
 *         description: Duplicate request - User already exist
 *       500:
 *         description: Internal server error
 *     security: []
 */
exports.CreateAccount = async (req, res, next) => {
  const { tg_id, username } = req.body;

  try {
    //Add checks for some other things
    const userCheck = await User.findOne({ tg_id: tg_id });
    if (userCheck) return next(new ErrorResponse("User already exist", 401));

    const user = new User({
      tg_id: tg_id,
      username: username,
    });

    return res.status(200).json({ status: true, data: user });
  } catch (error) {
    // Call handleErrors function
    next(error);
  }
};

/**
 * @Swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     tags: [Auth]
 *     requestBody:
 *      required: true
 *      content:
 *       application/json:
 *        schema:
 *         type: object
 *         required:
 *          - tg_id
 *         properties:
 *           tg_id:
 *             type: string
 *             description: Telegram ID of the user
 *             example: "123456789"
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: User ID
 *                       example: "60c72b2f9fd0b6002b5e1234"
 *                     tg_id:
 *                       type: string
 *                       description: The Telegram ID of the user
 *                       example: "123456789"
 *                     # Include additional user fields as necessary
 *                 token:
 *                   type: string
 *                   description: JWT authentication token
 *                   example: "eyJhbGciOiJIUzI1NiIsInR..."
 *       401:
 *         description: Unauthorized - User does not have an account
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "This User has no account"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 */
exports.loginUser = async (req, res, next) => {
  const { tg_id } = req.body;
  try {
    const user = await User.findOne(tg_id);
    if (!user) {
      return next(new ErrorResponse("This User has no account", 401));
    }
    const token = createToken(user._id);
    return res.status(200).json({ status: true, data: user, token: token });
  } catch (err) {
    next(err);
  }
};
