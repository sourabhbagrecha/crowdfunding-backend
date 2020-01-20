const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  balance: {
    type: Number 
  }
})

module.exports = mongoose.model('', userSchema);