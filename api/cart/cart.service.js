const db = require('../../helpers/db');
const Cart = db.Cart;
const Counter = db.Counter;

module.exports = {
    getById,
    create,
    update
};

async function getById(username) {
    return await Cart.findOne({ username:  username});
}

async function create(cart) {
    // validate
    if (await Cart.findOne({ username: cart.username })) {
        update(cart.id, cart);
    } else {
        const newCart = new Cart(cart);
        const count = await counter.findByIdAndUpdate(
            { field: 'cartid'}, {$inc: { count: 1} }, function(error, counter)   {
            if(error)
                return next(error);
            doc.testvalue = counter.seq;
            next();
        });
        newCart.id = count + 1;
        // save user
        await newCart.save();
    }
}

async function update(id, cartParams) {
    const cart = await Cart.findById(id);

    // validate
    if (!cart) throw 'Product not found';

    // copy userParam properties to user
    Object.assign(cart, cartParams);

    await cart.save();
}