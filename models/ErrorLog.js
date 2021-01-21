const mongoose = require('mongoose');

const errorSchema = new mongoose.Schema({
  message: {
    type: String,
  },
  info: {
    type: String,
  }
});

const Error = mongoose.model('Error', errorSchema);

module.exports = Error;
