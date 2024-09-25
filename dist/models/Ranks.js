import Mongoose, { Schema } from 'mongoose';
import userRanks from '../enums/userRanks';
import rankColor from '../enums/rankColor';
import extractLimit from '../enums/extractLimit';
import refillSpeed from '../enums/refillSpeed';
import upgradeCost from '../enums/upgradeCost';
const RankSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    unique: true,
    required: true
  },
  rank: {
    type: String,
    enum: Object.values(userRanks)
  },
  rankColor: {
    type: String,
    enum: Object.values(rankColor)
  },
  xtractLimit: {
    type: Number,
    enum: Object.values(extractLimit)
  },
  refillSpeed: {
    type: Number,
    enum: Object.values(refillSpeed)
  },
  upgradeCost: {
    type: Number,
    enum: Object.values(upgradeCost)
  },
  timestamps: {
    created_At: 'created_At',
    updated_At: 'updated_At'
  }
});
const Ranks = Mongoose.model('Ranks', RankSchema);
export default Ranks;