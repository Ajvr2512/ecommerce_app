const { getAll, create, getOne, remove, update } = require('../controllers/category.controllers');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');

const CategoryRouter = express.Router();

CategoryRouter.route('/')
    .get(getAll)
    .post(verifyJWT, create);

CategoryRouter.route('/:id')
    .get(getOne)
    .delete(verifyJWT,remove)
    .put(verifyJWT, update);

module.exports = CategoryRouter;