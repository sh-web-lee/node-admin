const mongoose = require('mongoose');

const UserListSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  account: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true
  },
  latestTime: {
    type: Date,
    required: true
  },
  createTime: {
    type: Date,
    required: true
  },
  role: {
    type: Array,
    required: true
  },
  opened: {
    type: Boolean,
    required: true
  }
})

const UserListModel = mongoose.model('userLists', UserListSchema)

module.exports = UserListModel