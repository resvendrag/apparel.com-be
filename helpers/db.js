const config = require('config.json');
const mongoose = require('mongoose');
mongoose.connect(config.connectionString, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../api/users/user.model'),
    Product: require('../api/catalog/catalog.model'),
    Counter: require('../api/catalog/counter.model')
};