const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schema = new Schema({
    username: {type: String, unique: false, required: true},
    email: {type: String, unique: true, required: true},
    phone: {type: String, unique: false, required: false},
    providers: {type: String, unique: false, required: false},
    hash: {type: String, required: false},
    createdDate: {type: Date, default: Date.now},
});

schema.set('toJSON', {virtuals: true});
module.exports = mongoose.model('User', schema);
