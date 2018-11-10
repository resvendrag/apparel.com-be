const express = require('express');
const router = express.Router();
const catalogService = require('./catalog.service');

// routes
router.post('/product', createProduct);
router.get('/', getByBatch);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', deleteProduct);

module.exports = router;

function createProduct(req, res, next) {
    catalogService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getByBatch(req, res, next) {
    catalogService.getAll(req.params.pageNo, req.params.pageSize)
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getById(req, res, next) {
    catalogService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    catalogService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function deleteProduct(req, res, next) {
    catalogService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}