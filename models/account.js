const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AccountSchema = new Schema(
  {
    name: {type: String, required: true, maxLength: 100},
    org: {type: String, required: true, maxLength: 100},
    account_id: {type: String, required: false, maxLength: 100},
  }
);

// Virtual for author's URL
AccountSchema
  .virtual('url')
  .get(function() { // We don't use an arrow function as we'll need the this object
    return `/catalog/category/${this._id}`;
  });

//Export model
module.exports = mongoose.model('Account', AccountSchema);