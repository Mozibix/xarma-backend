import Mongoose, { Schema } from 'mongoose';
import transactionType from '../enums/transactionType';
import transactionStatus from '../enums/TransactionStatus';
const TransactionsSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    unique: true,
    required: true
  },
  xeetScore: {
    type: Number,
    default: 0
  },
  gemaScore: {
    type: Number,
    default: 0
  },
  transactionType: {
    type: String,
    enum: Object.values(transactionType)
  },
  transactionStatus: {
    type: String,
    enum: transactionStatus
  },
  referenceId: {
    type: String,
    unique: true
  },
  timestamps: {
    created_At: 'created_At',
    updated_At: 'updated_At'
  }
});
const Transactions = Mongoose.model('Transactions', TransactionsSchema);
export default Transactions;