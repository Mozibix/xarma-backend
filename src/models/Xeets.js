import Mongoose, { Schema } from "mongoose";

const XeetSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      unique: true,
      required: true,
    },
    xeetScore: {
      type: Number,
      default: 0,
    },
    numberOfImpressionPerAccount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: {
      created_At: "created_At",
      updated_At: "updated_At",
    },
  }
);

const XeetScores = Mongoose.model("XeetScores", XeetSchema);

export default XeetScores;
