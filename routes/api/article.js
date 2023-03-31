const express = require('express');
const ArticleModel = require('../../models/ArticleModel');
const tokenMiddleware = require('../../middlewares/tokenMiddleware')

const router = express.Router({
  mergeParams: true
});

// 文章列表
router.get('/articles', tokenMiddleware, (req, res) => {
  ArticleModel.find()
    .then(data => {
      res.json({ 
        code: 200,
        msg: 'success',
        data
       })
    })
    .catch(err => {
      res.json({
        code: 3000,
        msg: 'query error~',
        data: err
      })
    })
})

// id获取文章
router.get('/articles/:id', tokenMiddleware, (req, res) => {
  const id = req.params.id
  ArticleModel.findOne({ _id: id })
    .then(data => {
      res.json({
        code: 200,
        msg: 'success',
        data
      })
    })
    .catch(err => {
      res.json({
        code: 3001,
        msg: 'query error~',
        data: null
      })
    })
})

// 发布文章
router.post('/article', tokenMiddleware, (req, res) => {
  ArticleModel.create({ ...req.body })
    .then(data => {
      res.json({
        code: 200,
        msg: 'success',
        data
      })
    })
    .catch(err => {
      res.json({
        code: 3001,
        msg: 'failed',
        data: null
      })
    })
})

// 更新文章
router.patch('/articles/:id', tokenMiddleware, (req, res) => {
  let _id = req.params.id
  ArticleModel.updateOne({ _id }, req.body).then(() => {
    // 更新成功，查询，返回更新后的文章
    ArticleModel.findById(_id)
      .then(data => {
        res.json({ 
          code: 200,
          msg: 'success',
          data
        })
      })
      // 查询失败
      .catch(err => {
        res.json({
          code: 3000,
          msg: 'query error~',
          data: err
        })
      })
  })
    .catch(err => {
      res.json({
        code: 3002,
        msg: 'update error~',
        data: err
      })
    })
})

module.exports = router