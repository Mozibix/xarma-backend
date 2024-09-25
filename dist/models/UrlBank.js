import Mongoose, { Schema } from 'mongoose';
import valueType from '../enums/extractorType';
const UrlBankSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    unique: true,
    required: true
  },
  gemaScorePerUrl: {
    type: Number,
    default: 0
  },
  xeetScorePerUrl: {
    type: Number,
    default: 0
  },
  numberOfImpression: {
    type: Number,
    default: 0
  },
  numberOfLikes: {
    type: Number,
    default: 0
  },
  isValidLink: {
    type: Boolean
  },
  url: {
    type: String
  },
  extractorType: {
    type: String,
    enum: Object.values(valueType)
  },
  timestamps: {
    created_At: 'created_At',
    updated_At: 'updated_At'
  }
});
const UrlBank = Mongoose.model('UrlBank', UrlBankSchema);
export default UrlBank;