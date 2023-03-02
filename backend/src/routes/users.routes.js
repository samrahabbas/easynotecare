const express = require('express');
const { registerUser, loginUser, protected } = require("../controllers/users.controller");

const usersRouter = express.Router();

usersRouter.route('/register').post(registerUser);

usersRouter.route('/login').post(loginUser);

usersRouter.route('/protected').get(protected);

module.exports = usersRouter;