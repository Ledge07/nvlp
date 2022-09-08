const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TransactionSchema = new Schema(
  {
    name: { type: String, required: true },
    amount: { type: Integer, required: true },
    date_posted: { type: Date, required: true },
    type: { type: String, required: true },
    transaction_id: { type: String, unique: true, required: true },
    account: [{ type: Schema.Types.ObjectId, ref: 'Account', required: true}],
    category: [{ type: Schema.Types.ObjectId, ref: 'Category'}]
  }
);

// Virtual for book's URL
TransactionSchema
  .virtual('url')
  .get(function() { // We don't use an arrow function as we'll need the this object
    return '/catalog/transaction/' + this._id;
  });

//Export model
module.exports = mongoose.model('Transaction', TransactionSchema);