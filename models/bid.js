const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bidSchema = new Schema({
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  amount: {
    type: Number
  }
})

module.exports = mongoose.model('Bid', bidSchema);