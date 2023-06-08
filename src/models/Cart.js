const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Cart = sequelize.define('cart', {
    //USERID,PRODUCTID
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
});

module.exports = Cart;