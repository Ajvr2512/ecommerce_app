const { getAll, create, getOne, remove, update, setProductImages } = require('../controllers/product.controllers');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');

const ProductRouter = express.Router();

ProductRouter.route('/')
    .get(getAll)
    .post(verifyJWT, create);

ProductRouter.route('/:id')
    .get(getOne)
    .delete(verifyJWT, remove)
    .put(verifyJWT, update);

ProductRouter.route('/:id/images')
.post(verifyJWT, setProductImages);

module.exports = ProductRouter;