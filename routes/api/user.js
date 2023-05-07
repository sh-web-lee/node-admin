const express = require('express');
const UserModel = require('../../models/UserModel');
const bcrypt = require('bcryptjs');
const tokenMiddleware = require('../../middlewares/tokenMiddleware')
// demo 接口
// const UserInfoModel = require('../../models/UserInfoModel')
// const UserListModel = require('../../models/UserListMode')
// const AuthListModel  = require('../../models/AuthModel')
// demo 接口
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


// demo 接口
// 获取用户信息
// router.get('/info', tokenMiddleware, (req, res) => {
//   UserInfoModel.find()
//     .then(data => {
//       res.json({
//         code: 200,
//         msg: 'success',
//         data: {
//           menus: data
//         }
//       })
//     })
// })

// // 注册用户
// router.post('/add', async (req, res) => {
//   const { id, account, username, email, latestTime, createTime, opened, role } = req.body
//   // 加密
//   // const salt = bcrypt.genSaltSync(10)
//   await UserListModel.create({ id, account, username, email, latestTime, createTime, opened, role })
//     .then(data => {
//       res.json({
//         code: 200,
//         msg: 'success',
//         data
//       })
//     })
//     .catch(err => {
//       res.json({
//         code: 2000,
//         msg: 'error',
//         data: err
//       })
//     })
// })
// // 获取用户列表
// router.get('/list', tokenMiddleware, (req, res) => {
//   const { keyword, pageSize, pageNum } = req.query
//   const reg = new RegExp(keyword, 'i')
//   // 可根据username或者account关键字查询
//   // 分页查询
//   UserListModel.find({ $or: [{ username: reg }, { account: reg }] }).limit(pageSize).skip(pageSize * (pageNum - 1))
//     .then(data => {
//       res.json({
//         code: 200,
//         msg: 'success',
//         data: {
//           list: data,
//           pageSize: pageSize,
//           pageNum: pageNum
//         }
//       })
//     })
//     .catch(err => {
//       res.json({
//         code: 2005,
//         msg: 'err',
//         data: err
//       })
//     })
// })
// // 根据id获取用户权限
// router.get('/role/:id', tokenMiddleware, (req, res) => {
//   let _id = req.params.id
//   UserListModel.findById({ _id }).then(data => {
//     let roles = data.role
//     let roleList = []
//     roles.forEach(async role => {
//       await AuthListModel.findOne({ name: role }).then(res => {
//         roleList.push(res)
//         console.log(roleList)
//       })
//     })
//     console.log(roleList)
//     res.json({
//       code: 200,
//       msg: 'success',
//       data: {
//         role: roleList
//       }
//     })
//   }).catch(err => {
//     res.json({
//       code: 2001,
//       msg: 'failed',
//       err
//     })
//   })
// })
// // 根据 id 修改用户信息
// router.post('/update/:id', tokenMiddleware, (req, res) => {
//   let _id = req.params.id
//   UserListModel.updateOne({ _id }, req.body).then(() => {
//     UserListModel.findById(_id)
//       .then(data => {
//         res.json({ 
//           code: 200,
//           msg: 'success',
//           data
//         })
//       })
//       // 查询失败
//       .catch(err => {
//         res.json({
//           code: 3000,
//           msg: 'query error~',
//           data: err
//         })
//       })
//   }).catch(err => {
//       res.json({
//         code: 3002,
//         msg: 'update error~',
//         data: err
//       })
//     })
// })
// // 获取所有角色权限
// router.get('/role/list', tokenMiddleware, (req, res) => {
//   AuthListModel.find().then(data => {
//     res.json({
//       code: 200,
//       msg: 'success',
//       data
//     })
//   })
// })

// demo 接口

module.exports = router