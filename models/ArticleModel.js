const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  tag: {
    type: [],
    required: true
  },
  body: {
    type: String,
    required: true
  },
  createTime: {
    type: Date,
    required: true
  },
  updateTime: {
    type: Date,
    required: true
  },
})

const ArticleModel = mongoose.model('articles', ArticleSchema)

module.exports = ArticleModel