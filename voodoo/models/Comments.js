var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
  body: String,
  author: String,
  upvotes: {type: Number, default: 0},
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }
});

PostSchema.methods.upvote = function(cb) {
  this.upvote += 1;
  this.save(cb);
};

mongoose.model('Comment', CommentSchema);
