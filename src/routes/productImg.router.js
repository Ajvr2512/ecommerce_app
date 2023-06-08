const { getAll, create, remove } = require('../controllers/productImg.controllers');
const express = require('express');
const upload = require('../utils/multer');
const verifyJWT = require('../utils/verifyJWT');

const ProductImgRouter = express.Router();

 ProductImgRouter.route('/')
    .get(verifyJWT, getAll)

ProductImgRouter.route('/')
    .post(verifyJWT, upload.single('image'), create);

ProductImgRouter.route('/:id')
    .delete(verifyJWT, remove);

module.exports =  ProductImgRouter;