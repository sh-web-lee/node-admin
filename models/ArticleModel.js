const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
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
  cover_img: {
    type: String,
    required: false
  },
  is_top: {
    type: Boolean,
    required: true
  }
})

const ArticleModel = mongoose.model('articles', ArticleSchema)

module.exports = ArticleModel