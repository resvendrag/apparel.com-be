const express = require('express');
const router = express.Router();
const cartService = require('./cart.service');

// routes
router.post('/create', createCart);
router.get('/byuser', getCart);
router.get('/update', update);

module.exports = router;

function createCart(req, res, next) {
    cartService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getCart(req, res, next) {
    cartService.getById(req.query.username)
        .then(users => res.json(users))
        .catch(err => next(err));
}

function update(req, res, next) {
    cartService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}