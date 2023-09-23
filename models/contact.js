const mongoose = require('mongoose');
const contatctSchema = new mongoose.Schema({name:{
    type: String,
    required: true
  },
  phone:{
    type:String,
    required: true
  }});
  const Contact = mongoose.model('Contact', contatctSchema);

  module.exports = Contact;