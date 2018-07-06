var mongoose = require('mongoose');

var BookSchema = new mongoose.Schema({
    isbn: String,
    title: String,
    
  });

  module.exports = mongoose.model('Book', BookSchema);