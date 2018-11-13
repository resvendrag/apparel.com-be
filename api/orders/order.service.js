const db = require('../../helpers/db');
const Order = db.Order;
const Counter = db.Counter;

module.exports = {
    getAll,
    getById,
    create
};

async function getAll(pageNo, pageSize) {
    return await Order.find({ skip: pageNo, limit: pageSize });
}

async function getById(id) {
    return await Order.findById(id);
}

async function create(order) {
    // validate
    if (await Order.findOne({ username: order.username })) {
        throw 'Item "' + order.id + '" is already exists';
    }

    const newOrder = new Order(order);
    const count = await Counter.findByIdAndUpdate(
        { field: 'orderid'}, {$inc: { count: 1} }, function(error, counter)   {
        if(error)
            return next(error);
        doc.testvalue = counter.seq;
        next();
    });
    newOrder.id = count + 1;
    // save user
    await newOrder.save();
}