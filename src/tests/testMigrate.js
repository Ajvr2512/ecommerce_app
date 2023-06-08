const User = require('../models/User');
const sequelize = require('../utils/connection');
require('../models/User');
require('../models/Category');
require('../models/Product');
require('../models/ProductImg');
require('../models/Cart');
require('../models/Purchase');
require('../models');

const main = async() => {
    try{
        await sequelize.sync({ force: true });
        await User.create({
            firstName: "Angela",
            lastName: "Villa",
            email: "Daniel@gmail.com",
            password: "1236",
            phone: "31568666"
        });
        process.exit();
    } catch(error){
        console.log(error);
    }
}

main();