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
    type: String,
    required: true
  },
  balance: {
    type: Number,
    default: 100000 
  },
  email: {
    type: String,
    required: true
  },
  otp: {
    token: Number,
    expiresIn: Date
  }
})

module.exports = User = mongoose.model('users', userSchema);