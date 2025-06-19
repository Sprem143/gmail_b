const mongoose = require('mongoose');

const senderSchema = new mongoose.Schema({
  email: String,
  appPassword: String,
   Date: {
      type: String,
      default: () => new Date().toLocaleString(),  
  }
});

module.exports = mongoose.model('Sender', senderSchema);
