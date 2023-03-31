const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    set (val) {
      return bcrypt.hashSync(val, 10);
   }
  }
})

const UserModel = mongoose.model('users', UserSchema)

module.exports = UserModel
