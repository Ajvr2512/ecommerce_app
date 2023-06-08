const { getAll, create, getOne, remove, update, login } = require('../controllers/user.controllers');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');

const UserRouter = express.Router();

UserRouter.route('/')
    .get(verifyJWT, getAll)
    .post(create);
UserRouter.route('/login')
.post(login)

UserRouter.route('/:id')
    .get(verifyJWT, getOne)
    .delete(verifyJWT, remove)
    .put(verifyJWT, update);

module.exports = UserRouter;