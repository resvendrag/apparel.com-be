const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    id: { type: Number, unique: true },
    username: { type: String, required: true },
    createdat: { type: Date, required: true },
    status: { type: String, required: true },
    items: { type: Array, required: true },
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Order', schema);