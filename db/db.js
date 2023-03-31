// 连接数据库

module.exports = function (success, error) {
  if (typeof error !== 'function') {
    error = () => {
      console.log('database connect failed~')
    }
  }
  const mongoose = require('mongoose');
  // 导入连接数据库配置
  // const { DBHOST, DBPORT, DBNAME } = require('../config/config')
  mongoose.connect(`mongodb://${ process.env.APP_DB_HOST }:${ process.env.APP_DB_PORT }/${ process.env.APP_DB_NAME }`)

  // 数据库连接成功
  mongoose.connection.once('open', () => {
    success()
  })
  // 数据库连接失败
  mongoose.connection.once('error', () => {
    error()
  })
  // 数据库断开
  mongoose.connection.once('close', () => {
    error()
  })
}
