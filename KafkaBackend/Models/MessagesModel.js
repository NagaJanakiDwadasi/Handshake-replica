const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var messageSchema = new Schema({
    user1: {
        id : {
            type: String,
            required: true 
        },
        name : {
            type: String,
            required: true
        }
       },
    user2: {
        id : {
            type: String,
            required: true 
        },
        name : {
            type: String,
            required: true
        }
    },
    messages: [{
        from: String,
        message: String,
        time: String
    }]
});

const Message = mongoose.model('conversations', messageSchema);
module.exports = Message;