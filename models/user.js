const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  uid: {
    type: String
  },
  password: {
    type: String
  },
  balance: {
    type: Number,
    default: 100000 
  },
  email: {
    type: String
  },
  otp: {
    token: Number,
    expiresIn: Date
  },
  isAdmin: Boolean
})

module.exports = User = mongoose.model('User', userSchema);