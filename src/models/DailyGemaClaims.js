import Mongoose, { Schema } from 'mongoose';

const DailyGemaClaimSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId, ref: 'Users', unique: true, required: true
    },
    dailyStreak: {
        type: Number
    },
    PreviousStreakCollected: {
        type: Boolean
    },
    timestamps: {
        created_At: 'created_At', updated_At: 'updated_At'
    }
})

const DailyGemaClaim = Mongoose.model('DailyGemaClaim', DailyGemaClaimSchema)

export default DailyGemaClaim;
