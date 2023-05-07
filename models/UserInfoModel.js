const mongoose = require('mongoose');

const UserInfoSchema = new mongoose.Schema({
})

const UserInfoModel = mongoose.model('menus', UserInfoSchema)

module.exports = UserInfoModel
