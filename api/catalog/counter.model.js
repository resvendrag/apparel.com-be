const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    field: String,
    count: Number
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Counter', schema);