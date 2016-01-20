mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
  title: String;
  link: String;
  upvotes: {type: Number, default: 0 },
  comments: [{type: mongoose.Schema.Types.ObjectID, 'Comment' }]
});

mongoose.model('Post', PostSchema);
