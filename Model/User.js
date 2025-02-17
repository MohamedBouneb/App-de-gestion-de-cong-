const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: { type: String,
    enum: ['ut', 'ad'],
    default: 'user' },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
