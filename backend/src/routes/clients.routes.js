const express = require("express");
const { getClients, createClient, updateClient, deleteClient } = require('../controllers/clients.controller')
const { isLogedIn } = require("../middlewares/authMiddleware.js");

const clientRouter = express.Router();

clientRouter.route('/get/:id').get(isLogedIn, getClients);

clientRouter.route('/delete').delete(isLogedIn, deleteClient);

clientRouter.route('/update').put(isLogedIn, updateClient);

clientRouter.route('/create').post(isLogedIn, createClient);

module.exports = clientRouter;