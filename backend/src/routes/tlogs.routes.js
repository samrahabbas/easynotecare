const express = require('express');
const { getTlogs, createTlog, updateTlog, deleteTlog } = require('../controllers/tlogs.controller');
const { isLogedIn } = require("../middlewares/authMiddleware.js");

const tlogsRouter = express.Router();

tlogsRouter.route('/get/:id').get(isLogedIn, getTlogs);

tlogsRouter.route('/create').post(isLogedIn, createTlog);

tlogsRouter.route('/update').put(isLogedIn, updateTlog);

tlogsRouter.route('/delete').delete(isLogedIn, deleteTlog);

module.exports = tlogsRouter;