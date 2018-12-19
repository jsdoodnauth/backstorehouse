const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const PostSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: false,
    default: 1
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  body: {
    type: String,
    required: true,
    trim: true
  }
});

PostSchema.plugin(timestamp);

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;