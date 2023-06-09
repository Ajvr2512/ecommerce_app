const catchError = require('../utils/catchError');
const Purchase = require('../models/Purchase');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const ProductImg = require('../models/ProductImg');

const getAll = catchError(async(req, res) => {
    const userId = req.user.id;
    const results = await Purchase.findAll( 
        { 
            include: [ {
                model: Product,
                include:[ProductImg]
            } ],
        where: { userId }
    });
    return res.json(results);
});

const buyCart = catchError(async(req, res) => {
    const userId = req.user.id;
    const cartPruducts = await Cart.findAll({ 
        where: { userId },
        attributes: ["userId", "productId", "quantity"],
        raw: true
    });
    await Purchase.bulkCreate(cartPruducts);
    await Cart.destroy({ where:{userId}});
    return res.status(201).json(cartPruducts);
});





module.exports = {
    getAll,
    buyCart
}