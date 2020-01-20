const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  brief: {
    type: String
  },
  description: {
    type: String,
    required: true
  },
  picture: {
    type: String,
    required: true
  },
  funds: {
    type: Number,
    default: 0
  },
  bids: [{
    type: Schema.Types.ObjectId,
    ref: 'Bid'
  }]
}, {timestamps: true})

module.exports = mongoose.model('Project', projectSchema);