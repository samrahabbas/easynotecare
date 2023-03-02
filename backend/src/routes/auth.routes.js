const express = require("express");
const { registerUser, loginUser } = require('../controllers/auth.controller.js');


const authRouter = express.Router();


authRouter.route("/register").post(registerUser);
authRouter.route("/login").post(loginUser);


module.exports = authRouter;