const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schema = new Schema({
    name: {type: String, unique: false, required: true},
    createdDate: {type: Date, default: Date.now},
});

schema.set('toJSON', {virtuals: true});
module.exports = mongoose.model('Provider', schema);
schema.virtual('users',{
    ref:'User',
    localField:'_id',
    foreignField:'providers'
});
