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

async function getAll(pageNo, pageSize, query, category) {
    if (category !== "") {
        return await Product.find({ category : category})
        .skip(parseInt(pageNo)).limit(parseInt(pageSize));
    }
    if ((!query || query === "") && (category == "")) {
        return await Product.find().skip(parseInt(pageNo)).limit(parseInt(pageSize));
    } else if (query) {
        return await Product.find({ name : { "$regex": query}})
        .skip(parseInt(pageNo)).limit(parseInt(pageSize));
    }
}

async function getById(id) {
    return await Product.findById(id);
}

async function create(product) {
    // validate
    if (await Product.findOne({ name: product.name })) {
        throw 'Item "' + product.name + '" is already taken';
    }

    const newProduct = new Product(product);
    const count = await counter.findByIdAndUpdate(
        { field: 'productid'}, {$inc: { count: 1} }, function(error, counter)   {
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