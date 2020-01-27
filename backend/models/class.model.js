
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Post
let Class = new Schema({
  topic: {
    type: String
  },
  price: {
    type: Number
  },
  location: {
    type: String
  },
  provider: {
    type: String
  },
  body: {
    review: {
      author: {
        type: String
      },
      ranking: {
        type: Number
      },
    }
  }
},{
    collection: 'posts'
});

module.exports = mongoose.model('Class', Class);
