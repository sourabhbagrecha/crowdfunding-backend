const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  uid: {
    type: Number,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  balance: {
    type: Number 
  }
})

module.exports = User = mongoose.model('users', userSchema);