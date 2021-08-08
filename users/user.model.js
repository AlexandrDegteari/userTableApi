const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schema = new Schema({
    providers:{
        type:[{ type : mongoose.Schema.Types.ObjectId, ref: 'Provider' }],
    },
    username: {type: String, unique: false, required: true},
    email: {type: String, unique: true, required: true},
    phone: {type: String, unique: false, required: true},
    createdDate: {type: Date, default: Date.now},
});

schema.set('toJSON', {virtuals: true});
module.exports = mongoose.model('User', schema);

