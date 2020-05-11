const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let EchoSchema = new Schema({
    userid: {type: String, required: true},
    text: {type: String, required: true, max: 100},
    reversed: {type: Boolean, required: true},
    dateCreated: {type: Date, required: true},
});


// Export the model
module.exports = mongoose.model('echoes', EchoSchema);