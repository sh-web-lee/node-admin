const express = require('express');
const UserModel = require('../../models/UserModel');
const bcrypt = require('bcryptjs');
// token
const jwt = require('jsonwebtoken');

const router = express.Router({
  mergeParams: true
});

// 注册
router.post('/reg', async (req, res) => {
  const { username, password } = req.body
  // 加密
  // const salt = bcrypt.genSaltSync(10)
  await UserModel.create({ username, password })
    .then(data => {
      res.json({
        code: 200,
        msg: 'success',
        data
      })
    })
    .catch(err => {
      res.json({
        code: 2000,
        msg: 'error',
        data: err
      })
    })
})

// 登录
router.post('/login', async (req, res) => {
  const { username, password } = req.body
  const user = await UserModel.findOne({ username }).select({ username: 1, password: 1, _id: 0 })
  // 用户不存在
  if (!user) {
    return res.json({
      code: 2001,
      msg: 'The user does not exist',
      data: null
    })
  }
  // 比较密码
  const isValid = bcrypt.compareSync(password, user.password)
  if (!isValid) {
    return res.json({
      code: 2003,
      msg: 'password is not current',
      data: null
    })
  }
  // 匹配成功，添加token信息返回接口
  let token = jwt.sign({
    username
  }, process.env.APP_JWT_SECRET, {
    expiresIn: 7 * 24 * 60 * 60
  })
  res.json({
    code: 200,
    msg: 'success',
    data: { username, token }
  })
})

module.exports = router