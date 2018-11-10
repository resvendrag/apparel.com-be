const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    pid: { type: Number, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    filters: { 
        brand: String ,
        size: String,
        sortby: String
    },
    images: Array,
    price: Number
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Product', schema);