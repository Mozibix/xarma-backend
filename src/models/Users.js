import Mongoose, { Schema } from "mongoose";
import userRanks from "../enums/userRanks.js";

const UserSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    tgId: {
      type: String,
      required: true,
      unique: true,
      sparse: true,
      index: true,
    },
    username: { type: String, required: true },
    xHandle: { type: String, required: false },
    tgUsername: { type: String, required: true, index: true },
    tgData: {
      type: Object,
    },
    tonWalletDetails: { type: Object, required: false },
    rank: {
      type: String,
      enum: Object.values(userRanks),
      default: userRanks.OBSERVER,
      required: false,
    },
    isTwitterActive: { type: Boolean, required: false },
    twitterDetails: { type: Object, required: false },
    inviteCode: { type: String, required: true, unique: true },
    avatar: { type: String, required: false },
  },
  { timestamps: { created_At: "created_At", updated_At: "updated_At" } }
);

UserSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

UserSchema.set("toJSON", { virtuals: true });

const User = Mongoose.model("Users", UserSchema);

export default User;
