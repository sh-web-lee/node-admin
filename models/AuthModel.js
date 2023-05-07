const mongoose = require('mongoose');

const AuthListSchema = new mongoose.Schema({
})

const AuthListModel = mongoose.model('auth', AuthListSchema)

module.exports = AuthListModel
