const db = require('../../helpers/db');
const Product = db.Product;
const Counter = db.Counter;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll(pageNo, pageSize) {
    return await Product.find({ skip: pageNo, limit: pageSize }).select('-hash');
}

async function getById(id) {
    return await Product.findById(id).select('-hash');
}

async function create(product) {
    // validate
    if (await Product.findOne({ name: product.name })) {
        throw 'Item "' + product.name + '" is already taken';
    }

    const newProduct = new Product(product);
    const count = await counter.findByIdAndUpdate(
        { field: 'id'}, {$inc: { count: 1} }, function(error, counter)   {
        if(error)
            return next(error);
        doc.testvalue = counter.seq;
        next();
    });
    newProduct.pid = count + 1;
    // save user
    await newProduct.save();
}

async function update(id, productParam) {
    const product = await Product.findById(id);

    // validate
    if (!product) throw 'Product not found';

    // copy userParam properties to user
    Object.assign(product, productParam);

    await product.save();
}

async function _delete(id) {
    await Product.findByIdAndRemove(id);
}