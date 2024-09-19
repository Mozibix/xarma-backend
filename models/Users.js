import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  tgId: { type: String, required: true, unique: true, sparse: true },
  username: { type: String, required: true },
  gems: Number,
  xHandle: String,
  tgUsername: String,
  tonWalletAddress: String,
  tonUsername: String,
  rank: {
    type: String,
    enum: ['Observer', 'Tracker', 'Strategist', 'Influencer', 'Architect', 'Innovator', 'Visionary', 'Commander', 'Mastermind', 'Conqueror'],
    default: 'null',
    required: true,
  },
  isTwitterActive: Boolean,
  inviteLink: String,
  xeet: Number,
  avatar: String,
}, { timestamps: true });

userSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

userSchema.set('toJSON', { virtuals: true });

const User = mongoose.model('User', userSchema);

export default User;
