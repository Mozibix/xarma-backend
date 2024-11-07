import Mongoose, { Schema } from "mongoose";

const UrlBankSchema = new Schema(
  {
    og: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
    sniper: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
    gemaScorePerUrl: {
      type: Number,
      default: 0,
    },
    xeetScorePerUrl: {
      type: Number,
      default: 0,
    },
    numberOfImpression: {
      type: Number,
      default: 0,
    },
    numberOfLikes: {
      type: Number,
      default: 0,
    },
    isValidLink: {
      type: Boolean,
    },
    url: {
      type: String,
    },
    extractorType: {
      type: String,
      enum: Object.values({ OG: "og", SNIPER: "sniper" }),
    },
  },
  {
    timestamps: {
      created_At: "created_At",
      updated_At: "updated_At",
    },
  }
);

const UrlBank = Mongoose.model("UrlBank", UrlBankSchema);

export default UrlBank;
