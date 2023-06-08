const express = require('express');
const UserRouter = require('./user.router');
const CategoryRouter = require('./category.router');
const ProductRouter = require('./product.router');
const ProductImgRouter = require('./productImg.router');
const cartRouter = require('./cart.router');
const purchaseRouter = require('./purchase.router');
const router = express.Router();

// colocar las rutas aquí

router.use('/users', UserRouter);
router.use('/categories', CategoryRouter);
router.use('/products', ProductRouter);
router.use('/product_images', ProductImgRouter);
router.use('/cart', cartRouter);
router.use('/purchases', purchaseRouter);

module.exports = router;