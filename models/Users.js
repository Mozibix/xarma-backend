require("dotenv").config();
const mongoose = require("mongoose");

/**
 * @swagger
 * components:
 *   schemas:
 *     user:
 *       type: object
 *       required:
 *         - tg_id
 *         - username
 *         - rank
 *       properties:
 *         _id:
 *           type: string
 *           format: uuid
 *           description: Unique identifier for the user
 *         tg_id:
 *           type: string
 *           description: A form of identifier to authenticate the user, for both login and signup
 *         username:
 *           type: string
 *           description: Also an identifier but to display and converse with user
 *         gems:
 *           type: number
 *           description: These are what the user earns
 *         rank:
 *           type: string
 *           description: generated password for the supply
 *         xeet:
 *           type: number
 *           description: This is a reward token balance of the user
 *         x_handle:
 *           type: string
 *           description: The user twitter handle
 *         tg_handle:
 *           type: string
 *           description: The user telegram's handle
 *         avatar:
 *           type: string
 *           description: Url showing what the user uses as their avatar on the dashboard
 *
 */
const userSchema = mongoose.Schema(
  {
    tg_id: {
      type: String,
      required: true,
      unique: true,
      sparse: true,
    },
    username: { type: String, required: true },
    gems: {
      type: Number,
    },
    x_handle: {
      type: String,
    },
    tg_handle: {
      type: String,
    },
    rank: {
      type: String,
      enum: [
        "Observer",
        "Tracker",
        "Strategist",
        "Influencer",
        "Architect",
        "Innovator",
        "Visionary",
        "Commander",
        "Mastermind",
        "Conqueror",
      ],
      default: "Observer",
      required: true,
    },
    xeet: {
      type: Number,
    },
    avatar: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

userSchema.set("toJSON", {
  virtuals: true,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
