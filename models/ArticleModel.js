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
  tags_name: {
    type: [],
    required: true
  },
  content: {
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
    type: Number,
    required: true
  }
})

const ArticleModel = mongoose.model('articles', ArticleSchema)

module.exports = ArticleModel