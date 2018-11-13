const express = require('express');
const router = express.Router();
const catalogService = require('./order.service');

// routes
router.post('/create', createOrder);
router.get('/', getOrders);
router.get('/:id', getOrderById);

module.exports = router;

function createOrder(req, res, next) {
    orderServ.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getOrders(req, res, next) {
    catalogService.getAll(req.params.pageNo, req.params.pageSize)
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getOrderById(req, res, next) {
    catalogService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}