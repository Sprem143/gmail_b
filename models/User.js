const mongoose = require('mongoose');

const senderSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role:{
        type:String,
        default:'user'
    }
});

module.exports = mongoose.model('User', senderSchema);
