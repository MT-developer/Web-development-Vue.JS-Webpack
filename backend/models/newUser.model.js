
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Post
const user = new Schema({
  first_name: {
      type: String
  },
  last_name: {
      type: String
  },
  email: {
      type: String,
      required: true
  },
  password: {
      type: String,
      required: true
  },
  date: {
      type: Date,
      default: Date.now
  },
  type: {
      type: String
  }
},
{
    collection: 'users'
})

module.exports = mongoose.model('users', user);